import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export function getArticles() {
    return API.get('articles', {
            'Content-Type': 'text/plain',
        }).then(res => {
            if (res.status === 200) {
                return {
                    data: res.data.articles,
                };
            }
        })
        .catch(err => {
            return {
                error: `Fetch articles failed: ${err}`
            };
        });
}

export function getArticleContent(articleId) {
    return API.get(`article/${articleId}`, {
        'Content-Type': 'text/plain',
    }).then(res => {
        if (res.status === 200) {
            return {
                data: res.data.article,
            };
        }
    }).catch(err => {
        return {
            error: `Fetch article content failed: ${err}`
        };
    });
}

export function login(email, password, cb) {
    API.post('login', {
        email,
        password,
    }, {
        'Content-Type': 'application/json',
    }).then(res => {
        if (res.status === 200 && res.data.token) {
            // set token to localStorage
            localStorage.setItem('token', res.data.token);
        }
        if (cb) cb(res.data);
    }, (err) => {
        if (cb) cb(err.response.data);
    }).catch(err => {
        console.log(`Login failed: ${err}`);
    });
}