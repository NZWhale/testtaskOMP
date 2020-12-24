import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { token } from '.';
import { Album, Artist, Image } from '../../types';


interface TrackItem {
    added_at: string,
    track: Track
}


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

class FullPlaylistCard extends React.Component<FullPlaylistCardProps> {
    state = {
        tracks: []
    }


    // getPlaylistsTracks(trackshref: string) {
    //     const result = fetch(`${trackshref}`, {
    //         method: 'GET',
    //         headers: { 'Authorization' : 'Bearer ' + token}
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         return data
    //     })

    //     return result
    // }

    // componentDidMount() {
    //     this.getPlaylistsTracks(this.props.tracks.href)
    //     .then((data) => {
    //         this.setState({tracks: data.items})
    //         console.log(data)
    //     })
    // }

    render() {
        const tracks = this.props.tracks.map((track: any) =>
        <Card>
        <Card.Text>{track.track.artists.map((artist: Artist) => artist.name + " ") + "-" + track.track.name} <img width = "50px" src={track.track.album.images[2].url} /></Card.Text>
        <audio controls>
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
                        <Card.Img variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>
                            <Card.Text>{this.props.description}</Card.Text>
                        </Card.Body>
                        {tracks}
                    </Card>
            </>
        )
    }
}

export default FullPlaylistCard