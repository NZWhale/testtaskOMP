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
    fullPlaylistInfo: FullPlaylistInfo
}

class FullPlaylistCard extends React.Component<FullPlaylistCardProps & PropsFromState> {
    state = {
        tracks: []
    }


    getPlaylistsTracks(trackshref: string) {
        const result = fetch(`${trackshref}`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then((response) => response.json())
        .then((data) => {
            return data
        })

        return result
    }

    componentDidMount() {
        this.getPlaylistsTracks(this.props.fullPlaylistInfo.tracks.href)
        .then((data) => {
            this.setState({tracks: data.items})
            console.log(data)
        })
    }

    render() {
        const tracks = this.state.tracks.map((track: any) =>
        <Card style={{
            width: '18rem',
            marginBottom: "12px"
        }}>
        <Card.Text>{track.track.artists.map((artist: Artist) => artist.name + " ") + "-" + track.track.name} <img width = "50px" src={track.track.album.images[2].url} /></Card.Text>
        <audio controls style={{width: "99%"}}>
        <source src={track.track.preview_url}></source>
        </audio>
        </Card>
        )
        return (
            <>
                    <Card style={{
                        width: '18rem',
                        marginBottom: "12px"
                    }}>
                        {tracks}
                    </Card>
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    fullPlaylistInfo: state.fullPlaylistInfo,
})

export default connect(mapStateToProps)(FullPlaylistCard)