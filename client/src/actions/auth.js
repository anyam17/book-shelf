import axios from 'axios';

export function auth() {
    const request = axios.get('/api/auth')
                    .then((res) => (res.data))
                    .catch((err) => (console.log(err)));

    return {
        type: 'USER_AUTH',
        payload: request
    }
}

export function registerUser({firstname, lastname, email, password}) {
    const request = axios.post('/api/register', {firstname, lastname, email, password})
                    .then((res) =>  (res.data))
                    .catch((err) => {
                        console.log(err)
                    });

    return {
        type: 'USER_REGISTRATION',
        payload: request
    }
}

export function loginUser({email, password}) {
    const request = axios.post('/api/login', {email, password})
                    .then((res) =>  (res.data))
                    .catch((err) => {
                        console.log(err)
                    });

    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function logout() {
    const request = axios.get('/api/logout')
                    .then((res) => {
                        return res.data;
                    })
                    .catch((err) => (console.log(err)));

    return {
        type: 'USER_LOGOUT',
        payload: request
    }
}