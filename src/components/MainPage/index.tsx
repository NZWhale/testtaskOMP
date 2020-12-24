import * as React from 'react';
import { Switch, Route, Redirect, BrowserRouter, withRouter, RouteComponentProps } from 'react-router-dom'
import BooksPage from '../BooksPage';
import Header from '../Header';
import MoviesPage from '../MoviesPage';
import MusicPage from '../MusicPage';
import FullPlaylistCard from '../MusicPage/FullPlaylistCard';


class MainPage extends React.Component<RouteComponentProps> {

    

    render() {
        return (
            <>
                <BrowserRouter>
                    <Header></Header>
                    <Switch>
                        <Route path='/movies'  component={MoviesPage} />
                        <Route path='/books'  component={BooksPage} />
                        <Route path='/music'  component={MusicPage} />
                        <Route path='/fullplaylistcard'  component={FullPlaylistCard} />
                        <Redirect from="/" to="/movies" />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}


export default withRouter(MainPage)