import axios from 'axios';

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) {
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
                        .then((res) => {
                            if (list) {
                                return [...list, ...res.data];
                            } else {
                                return res.data;
                            }
                        })

    return {
        type: 'FETCH_BOOKS',
        payload: request
    }
}

export function addBook({name, author, ownerId, review, rating, pages, price}) {
    const request = axios.post('/api/book', {name, author, ownerId, review, rating, pages, price})
                    .then((res) => {
                        return res.data
                    })
                    .catch((err) => {
                        console.log(err)
                    });

    return {
        type: 'ADD_BOOK',
        payload: request
    }
}

export function getMyBooks(id) {
    const request = axios.get(`/api/my_books?id=${id}`)
                        .then((res) => res.data)

    return {
        type: 'FETCH_MY_BOOKS',
        payload: request
    }
}

export function clearBooks() {
    return {
        type: 'CLEAR_BOOKS',
        payload: {} 
    }
}