export function checkIfAuthenticated() {
    if (localStorage.getItem('token')) {
        return true;
    }
    return false;
}

export function logout() {
    if(localStorage.getItem('token')){
        localStorage.removeItem('token');
    }
}