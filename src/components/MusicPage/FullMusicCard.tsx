import * as React from 'react';
import { Card } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Album, Artist, Image, StateInterface } from '../../types';





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
    accessToken: string
}

class FullPlaylistCard extends React.Component<FullPlaylistCardProps & PropsFromState> {
    state = {
        tracks: [],
        isLoaded: false
    }

    token = this.props.accessToken

    getArtistsTracks(id: string) {
        const result = fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
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
                this.setState({ isLoaded: true })
            })
    }

    render() {
        const tracks = this.state.tracks.map((track: any) =>
            <Card className="bg-dark text-white" style={{ marginTop: "12px" }}>
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
                <Loader style={{ marginTop: "20%", marginLeft: "46%" }}
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.state.isLoaded ? false : true}
                />
                { this.state.isLoaded &&
                    <Card style={{
                        width: '18rem',
                        marginLeft: "40%"
                    }}>
                        {tracks}
                    </Card>
                }
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    artistId: state.artistId,
    accessToken: state.accessToken,
})

export default connect(mapStateToProps)(FullPlaylistCard)