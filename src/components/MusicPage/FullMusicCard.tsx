import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { token } from '.';
import { Album, Artist, FullPlaylistInfo, Image, StateInterface } from '../../types';





interface Track {
    album: Album,
    artists: Array<Artist>
    available_markets: Array<string>,
    disc_number: number,
    duration_ms: number,
    href: string,
    id: string,
    is_local: boolean,
    name: string,
    popularity: number
    preview_url: string,
    track: true
    track_number: number,
    type: string,
}

interface FullPlaylistCardProps {
    images: Array<Image>,
    name: string,
    description: string
    tracks: Array<Track>

}

interface PropsFromState {
    artistId: string
}

class FullPlaylistCard extends React.Component<FullPlaylistCardProps & PropsFromState> {
    state = {
        tracks: []
    }


    getArtistsTracks(id: string) {
        const result = fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })

        return result
    }

    componentDidMount() {
        this.getArtistsTracks(this.props.artistId)
            .then((data) => {
                this.setState({ tracks: data.tracks })
                console.log(data)
            })
    }

    render() {
        const tracks = this.state.tracks.map((track: any) =>
            <Card className="bg-dark text-white" style={{marginTop:"12px"}}>
                <Card.Img src={track.album.images[0].url} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title>{track.album.artists.map((artist: Artist) => artist.name + " ") + "-" + track.album.name} </Card.Title>
                    <Card.Text>
                        <audio controls style={{ width: "99%" }}>
                            <source src={track.preview_url}></source>
                        </audio>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        )
        return (
            <>
                <Card style={{
                    width: '18rem',
                    marginLeft: "40%"
                }}>
                    {tracks}
                </Card>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    artistId: state.artistId,
})

export default connect(mapStateToProps)(FullPlaylistCard)