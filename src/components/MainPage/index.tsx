import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Switch, Route, Router, Redirect, BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom'
import BooksPage from '../BooksPage';
import Header from '../Header';
import MoviesPage from '../MoviesPage';

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
                        {/* <Route path='/music' component={MusicPage} /> */}
                        <Redirect from="/" to="/movies" />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}


export default withRouter(MainPage)