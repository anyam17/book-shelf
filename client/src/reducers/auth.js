export default (state={}, action) => {
    switch(action.type) {
        case 'USER_AUTH':
            return {
                ...state,
                auth: action.payload
            }
        case 'USER_REGISTRATION':
            return {
                ...state,
                auth: action.payload
            }
        case 'USER_LOGIN':
            return {
                ...state,
                auth: action.payload
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                auth: action.payload
            }

        default:
            return state;
    }
}