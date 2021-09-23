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
    type
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

export function deleteBook(id, ownerId) {
    const request = axios.delete(`/api/book?id=${id}`);
    return (dispatch) => {
        dispatch({ type: "DELETE_BOOK_REQUEST" });
        request
            .then((res) => {
                let result = res.data;
                axios.get(`/api/my_books?id=${ownerId}`).then((res) => {
                    dispatch({
                        type: "FETCH_MY_BOOKS",
                        payload: res.data,
                    });
                    dispatch({
                        type: "DELETE_BOOK",
                        payload: result,
                    });

                    setTimeout(() => {
                        dispatch(dismissNotification());
                    }, timeout);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getFavorites(id) {
    const request = axios
        .get(`/api/book/favorite?id=${id}`)
        .then((res) => res.data);

    return {
        type: "GET_FAVORITE_BOOKS",
        payload: request,
    };
}

export function addToFavorite(bookId, ownerId) {
    const request = axios.post("/api/book/favorite", { bookId, ownerId });

    return (dispatch) => {
        dispatch({ type: "ADD_BOOK_TO_FAVORITE_REQUEST" });
        request
            .then((res) => {
                dispatch({
                    type: "ADD_BOOK_TO_FAVORITE",
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

export function removeFromFavorites(favoriteId, ownerId) {
    const request = axios.delete(`/api/book/favorite?favoriteId=${favoriteId}`);
    return (dispatch) => {
        dispatch({ type: "REMOVE_BOOK_FROM_FAVORITE_REQUEST" });
        request
            .then((res) => {
                let result = res.data;
                axios.get(`/api/book/favorite?id=${ownerId}`).then((res) => {
                    dispatch({
                        type: "GET_FAVORITE_BOOKS",
                        payload: res.data,
                    });
                    dispatch({
                        type: "REMOVE_BOOK_FROM_FAVORITE",
                        payload: result,
                    });

                    setTimeout(() => {
                        dispatch(dismissNotification());
                    }, timeout);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getAllBooks() {
    const request = axios
        .get(`/api/admin/books`)
        .then((res) => res.data);

    return {
        type: "GET_ALL_BOOKS",
        payload: request,
    };
}

export function approveBook(bookId, isApproved) {
    return (dispatch) => {
        axios
            .post(`/api/admin/book/approve?bookId=${bookId}`, { isApproved })
            .then((res) => {
                dispatch(getAllBooks());
                dispatch({
                    type: "APPROVE_BOOK",
                    payload: res.data,
                });

                setTimeout(() => {
                    dispatch(dismissNotification());
                }, timeout);
            });
    }
}
