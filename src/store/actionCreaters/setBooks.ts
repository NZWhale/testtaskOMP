import Action, { Book} from "../../types"


const setBooksAction: string = "SET_BOOKS"

const setBooks = (value: Array<Book> | null): Action<any> => {
    return { 
        type: setBooksAction,
        payload: value
    }
}

export default setBooks