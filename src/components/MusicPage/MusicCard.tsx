import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Album, Artist, Image } from '../../types';



interface MusicCardProps {
    images: Array<Image>,
    artists: Array<Artist>

}

class MusicCard extends React.Component<MusicCardProps> {
    
    render() {
        return (
            <>
                    <Card style={{
                        width: '18rem',
                        marginBottom: "12px"
                    }}>
                        <Card.Img variant="top" src={this.props.images[0].url} />
                        <Card.Body>
                            <Card.Title>{this.props.artists.map(artist => artist.name + " ")}</Card.Title>
                        </Card.Body>
                    </Card>
            </>
        )
    }
}

export default MusicCard