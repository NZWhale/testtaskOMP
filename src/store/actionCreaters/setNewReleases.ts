import Action, { Album} from "../../types"


const setNewReleasesAction: string = "SET_NEW_RELEASES"

const setNewReleases = (value: Array<Album> | null): Action<any> => {
    return { 
        type: setNewReleasesAction,
        payload: value
    }
}

export default setNewReleases