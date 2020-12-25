import Action from "../../types"


const setAccessTokenAction: string = "SET_ACCESS_TOKEN"

const setAccessToken = (value: string | null): Action<any> => {
    return { 
        type: setAccessTokenAction,
        payload: value
    }
}

export default setAccessToken