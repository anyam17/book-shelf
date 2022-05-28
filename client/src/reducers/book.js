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

        case 'ADD_BOOK_SUCCESS':
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
            
        case 'DELETE_BOOK_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_BOOK':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                isLoading: false
            }

        case 'ADD_BOOK_TO_FAVORITE_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_FAVORITE_BOOKS':
            return {
                ...state,
                books: action.payload
            }

        case 'ADD_BOOK_TO_FAVORITE':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                isLoading: false
            }
            
        case 'REMOVE_BOOK_FROM_FAVORITE_REQUEST':
            return {
                ...state,
                isLoading: true
            }

        case 'REMOVE_BOOK_FROM_FAVORITE':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
                isLoading: false
            }

        case 'GET_ALL_BOOKS':
            return {
                ...state,
                books: action.payload
            }
        case 'APPROVE_BOOK':
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
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