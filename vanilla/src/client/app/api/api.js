import axios from 'axios';
import {
    setToken
} from '../utils/auth';

const API = axios.create({
    baseURL: 'https://localhost:3000/api/',
});

export function login(email, password, cb) {
    API.post('login', {
        email,
        password,
    }, {
        'Content-Type': 'application/json',
    }).then(res => {
        if (res.status === 200 && res.data.token) {
            // set token to localStorage
            setToken(res.data.token);
        }
        if (cb) cb(res.data);
    }, (err) => {
        if (cb) cb(err.response.data);
    }).catch(err => {
        console.log(`Login failed: ${err}`);
    });
}

export function getArticles(uid: null) {
    return API.get('articles', {
            'Content-Type': 'application/json',
            params: {
                uid,
            },
        }).then(res => {
            if (res.status === 200) {
                return {
                    data: res.data.articles,
                };
            }
        })
        .catch(err => {
            return {
                error: `Fetch articles failed: ${err}`,
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

export function getSavedArticles(userId) {
    const url = `${userId}/saved`;
    return API.get(url, {
        'Content-Type': 'application/json',
    }).then(res => {
        if (res.status === 200) {
            return {
                data: res.data.saved,
            };
        }
    }).catch(err => {
        return {
            error: `Fetch user saved articles failed: ${err}`,
        };
    });
}

export function saveArticle(userId, articleId, cb) {
    const url = `${userId}/saved`;
    API.put(url, {
        articleId,
    }, {
        'Content-Type': 'application/json',
    }).then(res => {
        if (res.status === 200 && cb) {
            cb(res.data);
        }
    }).catch(err => {
        console.log(`Save article failed: ${err}`);
    });
}

export function unSaveArticle(userId, articleId, cb) {
    const url = `${userId}/saved/${articleId}`;
    API.delete(url, {
        'Content-Type': 'application/json',
    }).then(res => {
        if (res.status === 200 && cb) {
            cb(res.data);
        }
    }).catch(err => {
        console.log(`Save article failed: ${err}`);
    });
}