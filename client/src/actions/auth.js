import axios from "axios";
import { dismissNotification, timeout } from "../utils";

export function auth() {
    const request = axios
        .get("/api/auth")
        .then((res) => res.data)
        .catch((err) => console.log(err));

    return {
        type: "USER_AUTH",
        payload: request,
    };
}

export function registerUser({ firstname, lastname, email, password }) {
    const request = axios.post("/api/register", {
        firstname,
        lastname,
        email,
        password,
    });

    return (dispatch) => {
        dispatch({ type: "USER_REGISTRATION_REQUEST" });
        request
            .then((res) => {
                dispatch({
                    type: "USER_REGISTRATION",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function loginUser({ email, password }) {
    const request = axios.post("/api/login", { email, password });

    return (dispatch) => {
        dispatch({ type: "USER_LOGIN_REQUEST" });
        request
            .then((res) => {
                dispatch({
                    type: "USER_LOGIN",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function logout() {
    const request = axios
        .get("/api/logout")
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));

    return {
        type: "USER_LOGOUT",
        payload: request,
    };
}
