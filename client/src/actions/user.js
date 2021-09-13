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