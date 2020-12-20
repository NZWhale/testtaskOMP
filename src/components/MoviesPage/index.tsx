import * as React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import store from '../../store/store';
import { Genre, StateInterface } from '../../types';
import MovieCard from './MovieCard';


interface PropsFromState {
    genres: Array<object>
}

class MoviesPage extends React.Component<PropsFromState> {
    state = {
        price: "2.5",
    }

    // genres: Array<Genre> = store.getState().genres

    

    render() {
        const genresList = this.props.genres.map((genre: any, index) =>  
            <option>{genre.name}</option>
        )
        console.log(genresList)
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
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                    <MovieCard />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StateInterface): PropsFromState => ({
    genres: state.genres
})

export default connect(mapStateToProps)(MoviesPage)