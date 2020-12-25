import Action, { Artist } from "../../types"


const setArtistsAction: string = "SET_ARTISTS"

const setArtists = (value: Array<Artist>): Action<any> => {
    return { 
        type: setArtistsAction,
        payload: value
    }
}

export default setArtists