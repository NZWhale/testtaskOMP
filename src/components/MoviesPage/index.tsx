import * as React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import setCurrentGenre from '../../store/actionCreaters/setCurrentGenre';
import setMovies from '../../store/actionCreaters/setMovies';
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

    setMoviesByGenre(genre: Genre) {
        const data = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`)
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    render() {
        const genresList = this.props.genres.map((genre: Genre, index) =>
            <option key={index} value={JSON.stringify(genre)}>{genre.name}</option>
        )
        const moviesList = this.props.movies.map((movie: any, index) =>
            <MovieCard movie={movie} key={index.toString()} />
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
                            <Form.Control as="select" onChange={(e) => {
                                this.setMoviesByGenre(JSON.parse(e.target.value))
                                    .then((data) => {
                                        const movies: Array<Movie> = data.results
                                        store.dispatch(setMovies(movies))
                                        console.log(store.getState().movies)
                                    })
                            }}>
                                {genresList}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder={`${this.state.price} $`} disabled={true} />
                            <Form.Control type="range" min="0" max="5" step="0.1" onChange={(e) => { this.setState({ price: e.target.value }) }} />
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