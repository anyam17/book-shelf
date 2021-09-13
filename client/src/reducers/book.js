const initialState = {
    message: null,
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
            
        case 'ADD_BOOK_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'ADD_BOOK':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                isLoading: false
            }

        case 'CLEAR_BOOKS':
            return {
                ...state,
                books: action.payload.books
            }

        case 'DISMISS_NOTIFICATION':
            return {
                ...state,
                message: null
            }

        default:
            return state;
    }
}