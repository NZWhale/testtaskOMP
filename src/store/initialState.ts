import { StateInterface } from "../types"



const initialState: StateInterface = {
    genres: [],
    movies: [],
    topMovies: [],
    currentGenre: null,
    books: [],
    musicGenres: [],
    newReleases: [],
    playlists: [],
    fullPlaylistInfo: {
        images: [],
        name: "",
        description: "",
        tracks: {
            href: ""
        }
    },
    artistId: ""
}

export default initialState