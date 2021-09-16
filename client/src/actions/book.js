import axios from "axios";
import { dismissNotification, timeout } from "../utils";

export function getBooks(limit = 10, start = 0, order = "asc", list = "") {
    const request = axios
        .get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then((res) => {
            if (list) {
                return [...list, ...res.data];
            } else {
                return res.data;
            }
        });

    return {
        type: "FETCH_BOOKS",
        payload: request,
    };
}

export function addBook(
    name,
    author,
    ownerId,
    review,
    rating,
    pages,
    price,
    file,
    size,
    type,
) {
    const request = axios.post("/api/book", {
        name,
        author,
        ownerId,
        review,
        rating,
        pages,
        price,
        file,
        size,
        type,
    });

    return (dispatch) => {
        dispatch({ type: "ADD_BOOK_REQUEST" });
        request
            .then((res) => {
                dispatch({
                    type: "ADD_BOOK",
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

export function getMyBooks(id) {
    const request = axios.get(`/api/my_books?id=${id}`).then((res) => res.data);

    return {
        type: "FETCH_MY_BOOKS",
        payload: request,
    };
}

export function clearBooks() {
    return {
        type: "CLEAR_BOOKS",
        payload: {},
    };
}