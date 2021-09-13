export default (state={}, action) => {
    switch(action.type) {
        case "USER_PROFILE_PHOTO_REQUEST":
            return {
                ...state,
                isLoading: true,
            };

        case "USER_PROFILE_PHOTO":
            return {
                ...state,
                auth: action.payload.data,
                message: action.payload.message,
                success: action.payload.success,
                isLoading: false,
            };
        case 'CLEAR_PROFILE_PHOTO':
            return {
                ...state,
                auth: action.payload.data
            }

        default:
            return state;
    }
}