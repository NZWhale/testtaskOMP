import * as React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import setMusicGenres from '../../store/actionCreaters/setMusicGenres';
import setNewReleases from '../../store/actionCreaters/setNewReleases';
import setPlaylists from '../../store/actionCreaters/setPlaylists';
import store from '../../store/store';
import { Album, StateInterface } from '../../types';
import MusicCard from './MusicCard';
import PlaylistCard from './PlaylistCard';

export const token = "BQChSdGtKohPK9nPOqmA7VDHH0zpnoe3Wb14_912729nK7zfVNVcyB1Rf_6YliIKGGLaMV8Ie52cK-sRCcMw-y7q8E-dkqZeNP8enOeSnrtF2WOi0fK82WVu9xC4a7gvpRIlBEkGrJ6ZUhN3bkegmOlY2IMLdWpQvKVIzdNnpV2D0erpFZU"

interface PropsFromState {
    musicGenres: Array<any>,
    newReleases: Array<Album>,
    playlists: Array<any>
}

class MusicPage extends React.Component<PropsFromState> {
    state = {
        price: "2.5",
        isGenreSelected: false
    }

    getGenres = () => {

        const result = fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })

        return result
    }

    getPlaylistByGenre = (genreId: string) => {

        const limit = 10;

        const result = fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
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
            headers: { 'Authorization': 'Bearer ' + token }
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
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })

        return result
    }
    getNewRelease = () => {

        const limit = 10;

        const result = fetch(`https://api.spotify.com/v1/browse/new-releases`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
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
            })
    }

    render() {
        const musicGenresList = this.props.musicGenres.map((genre: any, index) =>
            <option key={index} value={genre.id}>{genre.name}</option>
        )
        const musicList = this.props.newReleases.map((release: Album, index: any) =>
            <MusicCard images={release.images} artists={release.artists} key={index.toString()} />
        )
        const playList = this.props.playlists.map((playlist: any, index: any) =>
            <PlaylistCard images={playlist.images} name={playlist.name} description={playlist.description} tracks={playlist.tracks} key={index.toString()} />
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
                            <Form.Label>Book</Form.Label>
                            <Form.Control type="text" placeholder="Book title" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Ganre</Form.Label>
                            <Form.Control as="select" onChange={(e) => {
                                this.getPlaylistByGenre(e.target.value)
                                    .then(data => {
                                        const playlists = data.playlists.items
                                        store.dispatch(setPlaylists(playlists))
                                        this.setState({ isGenreSelected: true })
                                    })
                            }}>
                                {musicGenresList}
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
                    {this.state.isGenreSelected ? playList : musicList}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state: StateInterface): PropsFromState => ({
    musicGenres: state.musicGenres,
    newReleases: state.newReleases,
    playlists: state.playlists
})

export default connect(mapStateToProps)(MusicPage)