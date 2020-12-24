import Action, { FullPlaylistInfo, Genre } from "../../types"


const setFullPlaylistInfoAction: string = "SET_FULL_PLAYLIST_INFO"

const setFullPlaylistInfo = (value: FullPlaylistInfo | null): Action<any> => {
    return { 
        type: setFullPlaylistInfoAction,
        payload: value
    }
}

export default setFullPlaylistInfo