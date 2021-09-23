import axios from "axios";
import { dismissNotification, timeout } from "../utils";

export function uploadProfilePhoto({ photoId, userId, photo, type }) {
    const request = axios.post(`/api/profile_photo?id=${photoId}`, { userId, photo, type });

    return (dispatch) => {
        dispatch({ type: "USER_PROFILE_PHOTO_REQUEST" });
        request
            .then((res) => {
                dispatch({
                    type: "USER_PROFILE_PHOTO",
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

export function clearProfilePhoto() {
    return {
        type: "CLEAR_PROFILE_PHOTO",
        payload: {},
    };
}

export function getUsers() {
    const request = axios
        .get(`/api/admin/users`)
        .then((res) => {
            return res.data;
        });

    return {
        type: "FETCH_USERS",
        payload: request,
    };
}

export function setRole(userId, role) {
    return (dispatch) => {
        axios
            .post(`/api/admin/user/role?userId=${userId}`, { role })
            .then((res) => {
                dispatch(getUsers());
                dispatch({
                    type: "SET_USER_ROLE",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            });
    }
}

export function setStatus(userId, isActive) {
    return (dispatch) => {
        axios
            .post(`/api/admin/user/status?userId=${userId}`, { isActive })
            .then((res) => {
                dispatch(getUsers());
                dispatch({
                    type: "SET_USER_STATUS",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            });
    }
}

export function deleteUser(userId) {
    return (dispatch) => {
        axios
            .delete(`/api/admin/user?userId=${userId}`)
            .then((res) => {
                dispatch(getUsers());
                dispatch({
                    type: "DELETE_USER",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            });
    }
}