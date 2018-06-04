import React from 'react';
import List from './List';
import { getArticles } from '../api/api';

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

        const result = await getArticles();
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

    render() {
        const articles = this.state.articles.map(article => {
            return {
                id: article.ArticleId,
                title: article.Title,
                author: article.Author,
                date: article.Date,
                imgUrl: article.PosterUrl,
            };
        });

        return (
            <div className="home">
                <div className="container">
                    <List items={articles} onListItemClick={this.redirect} />
                </div>
            </div>
        );
    }
}

export default Home;