import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { token } from '.';
import { Album, Artist, Image } from '../../types';
import FullPlaylistCard from './FullPlaylistCard';


interface Track {
    href: string
  }

interface PlaylistCardProps {
    images: Array<Image>,
    name: string,
    description: string
    tracks: Track

}

class PlaylistCard extends React.Component<PlaylistCardProps> {
    state = {
        isCardOpen: false,
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
        this.getPlaylistsTracks(this.props.tracks.href)
        .then((data) => this.setState({ tracks: data.items}))
    }

    render() {
        return (
            <>
                    <Card style={{
                        width: '18rem',
                        marginBottom: "12px"
                    }} onClick={() => this.setState({ isCardOpen: true})}>
                        <Card.Img variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title>{this.props.name}</Card.Title>
                            <Card.Text>{this.props.description}</Card.Text>
                        </Card.Body>
                        {this.state.isCardOpen && 
                            <FullPlaylistCard images={this.props.images} name={this.props.name} description={this.props.description} tracks={this.state.tracks}/>
                        }
                    </Card>
            </>
        )
    }
}

export default PlaylistCard