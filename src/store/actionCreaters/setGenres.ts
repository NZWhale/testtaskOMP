import Action, { Genre } from "../../types"


const setGenresAction: string = "SET_GENRES"

const setGenres = (value: Array<Genre> | null): Action<any> => {
    return { 
        type: setGenresAction,
        payload: value
    }
}

export default setGenres