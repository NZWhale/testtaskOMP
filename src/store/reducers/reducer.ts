import { StateInterface } from "../../types";
import initialState from "../initialState";
import  Action  from "../../types";


const reducer = (state = initialState, action: Action<any>): StateInterface => {
    switch (action.type) {
        case "SET_GENRES":
            return { ...state, genres: action.payload}
        case "SET_MOVIES":
            return { ...state, movies: action.payload}
        case "SET_CURRENT_GENRE":
            return { ...state, currentGenre: action.payload}
        case "SET_TOP_MOVIES":
            return { ...state, topMovies: action.payload}
        case "SET_BOOKS":
            return { ...state, books: action.payload}
        case "SET_MUSIC_GENRES":
            return { ...state, musicGenres: action.payload}
        case "SET_NEW_RELEASES":
            return { ...state, newReleases: action.payload}
        case "SET_PLAYLISTS":
            return { ...state, playlists: action.payload}
        case "SET_FULL_PLAYLIST_INFO":
            return { ...state, fullPlaylistInfo: action.payload}
        case "SET_ARTIST_ID":
            return { ...state, artistId: action.payload}
        case "SET_ARTISTS":
            return { ...state, artists: action.payload}
        case "SET_ACCESS_TOKEN":
            return { ...state, accessToken: action.payload}
    }
    return state
}

export default reducer