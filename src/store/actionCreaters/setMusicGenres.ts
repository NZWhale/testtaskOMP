import Action, { Genre } from "../../types"


const setMusicGenresAction: string = "SET_MUSIC_GENRES"

const setMusicGenres = (value: Array<any> | null): Action<any> => {
    return { 
        type: setMusicGenresAction,
        payload: value
    }
}

export default setMusicGenres