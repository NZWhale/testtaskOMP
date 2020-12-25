import * as React from 'react';
import { Form } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import setCurrentGenre from '../../store/actionCreaters/setCurrentGenre';
import setGenres from '../../store/actionCreaters/setGenres';
import setMovies from '../../store/actionCreaters/setMovies';
import setTopMovies from '../../store/actionCreaters/setTopMovies';
import store from '../../store/store';
import { Genre, Movie, StateInterface } from '../../types';
import getRandomInRange from '../../utils';
import MovieCard from './MovieCard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


interface PropsFromState {
    genres: Array<Genre>,
    movies: Array<Movie>,
    topMovies: Array<Movie>,
}

class MoviesPage extends React.Component<PropsFromState> {
    state = {
        price: "3",
        topMovies: [],
        isLoaded: false
    }

    setMoviesByGenre(genre: Genre) {
        const data = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`)
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    setMoviesByKeyWords(keyword: string) {
        const data = fetch(`https://api.themoviedb.org/3/search/movie?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US&query=${keyword}&page=1&include_adult=false`)
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }


    setMoviesByPrice(price: number) {
        //TODO: now we rewrite movies in the state, we need to create another statement for filtered movies
        const currentMovies: Array<Movie> = this.props.movies
        const filtredMovies = currentMovies.filter(movie =>
            movie.price ? price >= movie.price : false
        )
        store.dispatch(setMovies(filtredMovies))
    }

    getGenres() {
        const data = fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    getMovies() {
        const data = fetch("https://api.themoviedb.org/3/discover/movie?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2020")
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return data
    }

    componentDidMount() {
        this.getGenres()
            .then(data => {
                const genres: Array<Genre> = data.genres
                store.dispatch(setGenres(genres))
            })
        this.getMovies()
            .then(data => {
                const movies: Array<Movie> = data.results
                movies.map(movie => {
                    movie.price = getRandomInRange(0, 5)
                })
                store.dispatch(setMovies(movies))
                store.dispatch(setTopMovies(movies))
                this.setState({isLoaded: true})
            })
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
                    marginTop: "12px",
                    marginLeft: "12px"
                }}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Search by keywords</Form.Label>
                            <Form.Control type="text" placeholder="Movie title" onChange={(e) => {
                                if (e.target.value) {
                                    this.setMoviesByKeyWords(e.target.value)
                                        .then((data) => {
                                            const movies: Array<Movie> = data.results
                                            movies.map(movie => {
                                                movie.price = getRandomInRange(0, 5)
                                            })
                                            store.dispatch(setMovies(movies))

                                        })
                                } else {
                                    store.dispatch(setMovies(this.props.topMovies))
                                }
                            }} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Search by genre</Form.Label>
                            <Form.Control as="select" onChange={(e) => {
                                this.setMoviesByGenre(JSON.parse(e.target.value))
                                    .then((data) => {
                                        const movies: Array<Movie> = data.results
                                        movies.map(movie => {
                                            movie.price = getRandomInRange(0, 5)
                                        })
                                        store.dispatch(setMovies(movies))
                                        console.log(store.getState().movies)
                                    })
                            }}>
                                {genresList}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicRange">
                            <Form.Label>Filter by Price</Form.Label>
                            <Form.Control type="text" placeholder={`${this.state.price} $`} disabled={true} />
                            <Form.Control type="range" min="0" max="5" onChange={(e) => {
                                this.setState({ price: e.target.value })
                                this.setMoviesByPrice(parseInt(e.target.value))
                            }} />
                        </Form.Group>
                    </Form>
                </div>
                <Loader style={{ marginTop: "20%", marginLeft: "35%" }}
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.state.isLoaded ? false : true}
                />
                {this.state.isLoaded &&
                    <div style={{
                        marginLeft: "25%",
                        marginTop: "12px"
                    }}>
                        {moviesList}
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    genres: state.genres,
    movies: state.movies,
    topMovies: state.topMovies
})

export default connect(mapStateToProps)(MoviesPage)