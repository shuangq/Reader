import React from 'react';
import List from './List';
import { getSavedArticles, saveArticle, unSaveArticle } from '../api/api';
import * as Auth from '../utils/auth';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
        this._isMounted = false;
    }
    async componentDidMount() {
        this._isMounted = true;
        const uid = Auth.checkIfAuth();

        if (uid) {
            const result = await getSavedArticles(uid);

            if (this._isMounted && result.data) {
                this.setState({ articles: result.data });
            } else if (result.error) {
                console.log(result.error);
            }
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
        if (userId && ifSaved) {
            unSaveArticle(userId, articleId, (data) => {
                this.updateArticleSavedStatus(data.articleId);
            });
        } 
    };

    updateArticleSavedStatus = (targetId) => {
        // remove from articles
        const newArticles = this.state.articles.filter(article => article.ArticleId !== targetId);
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
            <div className="page-saved">
                <div className="container">
                    <List items={articles} onListItemClick={this.redirect} onSaveClick={this.onSaveClick} />
                </div>
            </div>
        );
    }
}

export default Saved;