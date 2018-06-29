import React from 'react';
import List from './List';
import { getArticles, saveArticle, unSaveArticle } from '../api/api';
import * as Auth from '../utils/auth';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
        this._isMounted = false;
    }
    async componentDidMount() {
        this._isMounted = true;
        const uid = Auth.checkIfAuth() || null;
        const result = await getArticles(uid);

        if (this._isMounted && result.data) {
            this.setState({ articles: result.data });
        } else if (result.error) {
            console.log(result.error);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    redirect = (articleId) => {
        this.props.history.push(`/article/${articleId}`);
    };

    onSaveClick = (articleId, ifSaved) => {
        const userId = Auth.checkIfAuth();
        if (!userId) {
            // @TODO: popup message
            console.log('Please log in first.');
        } else if (ifSaved) {
            unSaveArticle(userId, articleId, (data) => {
                this.updateArticleSavedStatus(data.articleId, null);
            });
        } else {
            saveArticle(userId, articleId, (data) => {
                this.updateArticleSavedStatus(data.articleId, userId);
            });
        }
    };

    updateArticleSavedStatus = (targetId, userId) => {
        // update articles in frontend
        const newArticles = this.state.articles.map(article => {
            if (article.ArticleId === targetId) {
                article.User = userId;
            }
            return article;
        });
        if (this._isMounted) {
            this.setState({ articles: newArticles });
        }
    };


    render() {
        const articles = this.state.articles.map(article => {
            return {
                id: article.ArticleId,
                title: article.Title,
                author: article.Author,
                date: article.Date,
                imgUrl: article.PosterUrl,
                ifSaved: Boolean(article.User),
            };
        });

        return (
            <div className="page-home">
                <div className="container">
                    <List items={articles} onListItemClick={this.redirect} onSaveClick={this.onSaveClick} />
                </div>
            </div>
        );
    }
}

export default Home;