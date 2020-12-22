import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Switch, Route, Router, Redirect, BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom'
import setGenres from '../../store/actionCreaters/setGenres';
import setMovies from '../../store/actionCreaters/setMovies';
import setTopMovies from '../../store/actionCreaters/setTopMovies';
import store from '../../store/store';
import { Genre, Movie } from '../../types';
import getRandomInRange from '../../utils';
import BooksPage from '../BooksPage';
import Header from '../Header';
import MoviesPage from '../MoviesPage';
import MusicPage from '../MusicPage';

const history = createBrowserHistory()

class MainPage extends React.Component<RouteComponentProps, any> {

    

    render() {
        return (
            <>
                <BrowserRouter>
                    <Header></Header>
                    <Switch>
                        <Route path='/movies' component={MoviesPage} />
                        <Route path='/books' component={BooksPage} />
                        <Route path='/music' component={MusicPage} />
                        <Redirect from="/" to="/movies" />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}


export default withRouter(MainPage)