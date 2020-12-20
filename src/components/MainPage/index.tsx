import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Switch, Route, Router, Redirect, BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom'
import setGenres from '../../store/actionCreaters/setGenres';
import store from '../../store/store';
import { Genre } from '../../types';
import BooksPage from '../BooksPage';
import Header from '../Header';
import MoviesPage from '../MoviesPage';

const history = createBrowserHistory()

class MainPage extends React.Component<RouteComponentProps, any> {

    getGenres() {
        const data = fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=5de7737ed4ed99493eb389b2fe3adc9d&language=en-US")
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
            console.log(genres)
        })
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Header></Header>
                    <Switch>
                        <Route path='/movies' component={MoviesPage} />
                        <Route path='/books' component={BooksPage} />
                        {/* <Route path='/music' component={MusicPage} /> */}
                        <Redirect from="/" to="/movies" />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}


export default withRouter(MainPage)