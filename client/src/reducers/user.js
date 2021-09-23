const initialState = {
    users: [],
    message: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        case "CLEAR_PROFILE_PHOTO":
            return {
                ...state,
                auth: action.payload.data,
            };

        case "FETCH_USERS":
            return {
                ...state,
                users: action.payload,
            };

        case "SET_USER_ROLE":
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
            };

        case "SET_USER_STATUS":
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
            };

        case "DELETE_USER":
            return {
                ...state,
                message: action.payload.message,
                success: action.payload.success,
            };

        case "DISMISS_NOTIFICATION":
            return {
                ...state,
                message: null,
            };

        default:
            return state;
    }
};
