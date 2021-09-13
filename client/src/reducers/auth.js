export default (state = {}, action) => {
    switch (action.type) {
        case "USER_AUTH":
            return {
                ...state,
                auth: action.payload,
            };

        case "USER_REGISTRATION_REQUEST":
            return {
                ...state,
                isLoading: true,
            };

        case "USER_REGISTRATION":
            return {
                ...state,
                auth: action.payload,
                message: action.payload.message,
                isLoading: false,
            };

        case "USER_LOGIN_REQUEST":
            return {
                ...state,
                isLoading: true,
            };

        case "USER_LOGIN":
            return {
                ...state,
                auth: action.payload,
                message: action.payload.message,
                isLoading: false,
            };
        case "USER_LOGOUT":
            return {
                ...state,
                auth: action.payload,
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
