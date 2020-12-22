import * as React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Movie } from '../../types';

interface MovieCardProps {
    movie: Movie
    key: any
}

class MovieCard extends React.Component<MovieCardProps> {
    render() {
        return (
            <>
                <Card style={{ 
                    width: '18rem',
                    marginBottom: "12px"
             }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`} />
                    <Card.Body>
                        <Card.Title>{this.props.movie.title}</Card.Title>
                        <Card.Text>
                            {this.props.movie.overview}
                        </Card.Text>
                        <Button variant="primary">Buy</Button> {this.props.movie.price} $
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default MovieCard