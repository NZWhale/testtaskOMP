import Action, { Genre } from "../../types"


const setCurrentGenreAction: string = "SET_CURRENT_GENRE"

const setGenres = (value: Genre | null): Action<any> => {
    return { 
        type: setCurrentGenreAction,
        payload: value
    }
}

export default setGenres