import Action, { Movie } from "../../types"


const setMoviesAction: string = "SET_MOVIES"

const setMovies = (value: Array<Movie> | null): Action<any> => {
    return { 
        type: setMoviesAction,
        payload: value
    }
}

export default setMovies