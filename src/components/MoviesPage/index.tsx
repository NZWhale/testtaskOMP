import * as React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../../store/store';
import { Genre, Movie, StateInterface } from '../../types';
import MovieCard from './MovieCard';


interface PropsFromState {
    genres: Array<Genre>,
    movies: Array<Movie>
}

class MoviesPage extends React.Component<PropsFromState> {
    state = {
        price: "2.5",
    }

    render() {
        const genresList = this.props.genres.map((genre: Genre, index) =>  
            <option key={index}>{genre.name}</option>
        )
        const moviesList = this.props.movies.map((movie: any, index) =>
            <MovieCard movie={movie} key={index.toString()}/>
        )
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start"
            }}>
                <div style={{
                    marginTop: "12px"
                }}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Movie</Form.Label>
                            <Form.Control type="text" placeholder="Movie title" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control as="select">
                                {genresList}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder={`${this.state.price} $`} disabled={true}/>
                            <Form.Control type="range" min="0" max="5" step="0.1" onChange={(e) => {this.setState({price: e.target.value})}}/>
                        </Form.Group>
                    </Form>
                </div>
                <div style={{
                    marginLeft: "25%",
                    marginTop: "12px"
                }}>
                    {moviesList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    genres: state.genres,
    movies: state.movies
})

export default connect(mapStateToProps)(MoviesPage)