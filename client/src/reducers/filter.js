const initialState = {
    books: [],
    isEmpty: false,
};

export default function(state=initialState, action) {
    switch(action.type) {
        case 'FILTER_BOOKS':
            return {
                ...state,
                books: action.payload.filtered,
                isEmpty: action.payload.isEmpty
            }

        default:
            return state;
    }
}