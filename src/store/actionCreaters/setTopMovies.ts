import Action, { Movie } from "../../types"


const setTopMoviesAction: string = "SET_TOP_MOVIES"

const setTopMovies = (value: Array<Movie> | null): Action<any> => {
    return { 
        type: setTopMoviesAction,
        payload: value
    }
}

export default setTopMovies