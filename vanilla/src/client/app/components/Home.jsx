import React from 'react';
import List from './List';
import {getArticles} from '../api/api';

const articles = [
    {
        id: '1',
        title: 'Webpack 2 and Font-Awesome Icon Importing With A Longer Title I Want To See If This Would Work',
        author: 'Chanon Roy',
        imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*V3Kfghg_jIV0ubxmAnCXBA.jpeg',
        date: 'May 3, 2017',
    }, {
        id: '2',
        title: 'Real Madrid v Liverpool: What now after Champions League defeat?',
        author: 'Phil McNulty',
        imgUrl: 'https://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/F9D4/production/_101765936_gettyimages-962785046.jpg',
        date: 'May 27, 2018',
    }, {
        id: '3',
        title: 'Tomorrow\'s cities: Google\'s Toronto city built \'from the internet up\'',
        author: 'Jane Wakefield',
        imgUrl: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/F6DB/production/_100159136_googlecitybikes.gif',
        date: 'May 27, 2018',
    }
];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        };
    }
    async componentDidMount() {
        const articles = await getArticles();
        this.setState({articles});
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