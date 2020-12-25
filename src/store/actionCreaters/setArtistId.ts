import Action, { Genre } from "../../types"


const setArtistIdAction: string = "SET_ARTIST_ID"

const setArtistId = (value: string | null): Action<any> => {
    return { 
        type: setArtistIdAction,
        payload: value
    }
}

export default setArtistId