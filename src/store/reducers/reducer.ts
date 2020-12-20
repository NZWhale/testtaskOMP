import { StateInterface } from "../../types";
import initialState from "../initialState";
import  Action  from "../../types";


const reducer = (state = initialState, action: Action<any>): StateInterface => {
    switch (action.type) {
        case "SET_GENRES":
            return { ...state, genres: action.payload}
    }
    return state
}

export default reducer