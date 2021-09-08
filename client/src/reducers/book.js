const initialState = {
    books: [],
};

export default function(state=initialState, action) {
    switch(action.type) {
        case 'FETCH_BOOKS':
            return {
                ...state,
                books: action.payload
            }

        case 'FETCH_MY_BOOKS':
            return {
                ...state,
                books: action.payload
            }
            
        case 'ADD_BOOK':
            return {
                ...state,
                book: action.payload
            }

        case 'CLEAR_BOOKS':
            return {
                ...state,
                books: action.payload.books
            }

        default:
            return state;
    }
}