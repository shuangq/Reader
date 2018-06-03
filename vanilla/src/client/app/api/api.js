import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api/',
});

export function getArticles() {
    return API.get('articles', {
            'Content-Type': 'text/plain',
        }).then(res => res.data._items)
        .catch(err => {
            console.log(`Fetch articles failed: ${err}`);
        });
}