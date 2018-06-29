import React from 'react';
import { getArticleContent } from '../api/api';
import he from 'he';
import './Article.scss';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: null,
        };
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        // fetch article content
        const articleId = this.props.match.params.aid;

        const result = await getArticleContent(articleId);
        if (this._isMounted && result.data) {
            this.setState({ article: result.data });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const decodedContent = this.state.article ? he.decode(this.state.article.Body) : '';
        const {Title: title, Author: author} = this.state.article || {};
        return (
            <div className="article">
                <div className="container">
                    <div className="header">
                        <h1>{title}</h1>
                        <p>By <span>{author}</span></p>
                    </div>
                    <article lang="en" dangerouslySetInnerHTML={{ __html: decodedContent }} />
                </div>
            </div>
        )
    }
}

export default Article;
