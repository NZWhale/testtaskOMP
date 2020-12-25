import { BrowserHistory } from 'history';
import * as React from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import setArtistsTopSongs from '../../store/actionCreaters/setArtists';
import setMusicGenres from '../../store/actionCreaters/setMusicGenres';
import setNewReleases from '../../store/actionCreaters/setNewReleases';
import setPlaylists from '../../store/actionCreaters/setPlaylists';
import store from '../../store/store';
import { Album, Artist, Book, StateInterface } from '../../types';
import ArtistCard from './ArtistCard';
import MusicCard from './MusicCard';
import PlaylistCard from './PlaylistCard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'



interface PropsFromState {
    musicGenres: Array<any>,
    newReleases: Array<Album>,
    playlists: Array<any>,
    artists: Array<Artist>,
    accessToken: string
}

interface MusicPageProps extends RouteComponentProps {
    history: BrowserHistory
}

class MusicPage extends React.Component<PropsFromState & MusicPageProps> {
    state = {
        price: "2.5",
        authorName: "",
        isGenreSelected: false,
        isAuthorSelected: false,
        isPlaylistsLoaded: false,
        isLoaded: false
    }

    token = this.props.accessToken
    
    getGenres = () => {
        const result = fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return result
    }

    getPlaylistByGenre = (genreId: string) => {
        const result = fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })

        return result
    }
    getAlbumsByArtist = (artist: string) => {
        const limit = 10;
        const result = fetch(`https://api.spotify.com/v1/artists/${artist}/albums?market=ES&limit=${limit}&offset=5`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return result
    }

    getTracks = (tracksEndPoint: string) => {
        const limit = 10;
        const result = fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return result
    }
    getNewRelease = () => {
        const result = fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return result
    }

    getArtistsIds(artist: string) {
        const result = fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
        return result
    }

    componentDidMount() {
        this.getGenres()
            .then(data => {
                const genres: Array<any> = data.categories.items
                store.dispatch(setMusicGenres(genres))
            })
        this.getNewRelease()
            .then(data => {
                const newReleases: Array<Album> = data.albums.items
                store.dispatch(setNewReleases(newReleases))
                this.setLoadedStatus()
            })
    }
    setLoadedStatus() {
        this.setState({ isLoaded: true })
    }
    render() {
        const musicGenresList = this.props.musicGenres.map((genre: any, index) =>
            <option key={index} value={genre.id}>{genre.name}</option>
        )
        const musicList = this.props.newReleases.map((release: Album, index: any, arr: any) =>
            <MusicCard history={this.props.history} location={this.props.location} match={this.props.match} images={release.images} artists={release.artists} key={index.toString()} />
        )
        const playList = this.props.playlists.map((playlist: any, index: any) =>
            <PlaylistCard history={this.props.history} location={this.props.location} match={this.props.match} images={playlist.images} name={playlist.name} description={playlist.description} tracks={playlist.tracks} key={index.toString()} />
        )
        const artistsList = this.props.artists.map((artist: any, index: any) =>
            <ArtistCard history={this.props.history} location={this.props.location} match={this.props.match} artist={artist} key={index.toString()} />
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
                            <Form.Label>Search by author</Form.Label>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Author name"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => this.setState({ authorName: e.target.value })}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => {
                                        this.getArtistsIds(this.state.authorName)
                                            .then((data) => {
                                                const artists: Array<Artist> = data.artists.items
                                                store.dispatch(setArtistsTopSongs(artists))
                                                this.setState({ isAuthorSelected: true })
                                                this.setState({ isGenreSelected: false })
                                            })
                                    }}>Search</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Ganre</Form.Label>
                            <Form.Control as="select" onChange={(e) => {
                                this.getPlaylistByGenre(e.target.value)
                                    .then(data => {
                                        const playlists = data.playlists.items
                                        store.dispatch(setPlaylists(playlists))
                                        this.setState({ isGenreSelected: true })
                                        this.setState({ isAuthorSelected: false })
                                    })
                            }}>
                                {musicGenresList}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>
                <Loader style={{ marginTop: "20%", marginLeft: "30%" }}
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.state.isLoaded ? false : true}
                />
                {this.state.isLoaded &&
                    <div style={{
                        marginLeft: "21%",
                        marginTop: "12px"
                    }}>
                        {this.state.isAuthorSelected ? artistsList : (this.state.isGenreSelected ? playList : musicList)}
                    </div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state: StateInterface): PropsFromState => ({
    musicGenres: state.musicGenres,
    newReleases: state.newReleases,
    playlists: state.playlists,
    artists: state.artists,
    accessToken: state.accessToken,
})

export default connect(mapStateToProps)(MusicPage)