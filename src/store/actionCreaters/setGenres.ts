import Action, { Genre } from "../../types"


const genresAction: string = "SET_GENRES"

const setGenres = (value: Array<Genre> | null): Action<any> => {
    return { 
        type: genresAction,
        payload: value
    }
}

export default setGenres