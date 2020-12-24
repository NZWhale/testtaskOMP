import Action, { Album} from "../../types"


const setPlaylistsAction: string = "SET_PLAYLISTS"

const setPlaylists = (value: Array<any> | null): Action<any> => {
    return { 
        type: setPlaylistsAction,
        payload: value
    }
}

export default setPlaylists