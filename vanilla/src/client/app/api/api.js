import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export function getArticles() {
    return API.get('articles', {
            'Content-Type': 'text/plain',
        }).then(res => {
            if (res.status === 200) {
                return {
                    data: res.data._items,
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
                data: res.data
            };
        }
    }).catch(err => {
        return {
            error: `Fetch article content failed: ${err}`
        };
    });
}