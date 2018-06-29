import jwt from 'jsonwebtoken';

function getToken() {
    return localStorage.getItem('token');
}

function removeToken() {
    if (getToken()) {
        localStorage.removeItem('token');
    }
}

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function checkIfAuth() {
    const token = getToken();
    if (token) {
        return jwt.decode(token).userId;
    }
    return false;
}

export function getUserFirstName() {
    const token = getToken();
    const data = jwt.decode(token);
    return data.firstName;
}

export function logout() {
    if (getToken()) {
        removeToken();
    }
}