import React from 'react';
import List from './List';

const articles = [
    {
        title: 'Webpack 2 and Font-Awesome Icon Importing With A Longer Title I Want To See If This Would Work',
        author: 'Chanon Roy',
        imgUrl: 'https://cdn-images-1.medium.com/max/1600/1*V3Kfghg_jIV0ubxmAnCXBA.jpeg',
        date: 'May 3, 2017',
    },{
        title: 'Real Madrid v Liverpool: What now after Champions League defeat?',
        author: 'Phil McNulty',
        imgUrl: 'https://ichef.bbci.co.uk/onesport/cps/800/cpsprodpb/F9D4/production/_101765936_gettyimages-962785046.jpg',
        date: 'May 27, 2018',
    },{
        title: 'Tomorrow\'s cities: Google\'s Toronto city built \'from the internet up\'',
        author: 'Jane Wakefield',
        imgUrl: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/F6DB/production/_100159136_googlecitybikes.gif',
        date: 'May 27, 2018',
    }
];
class Home extends React.Component{
    render() {
        return <List items={articles} />;
    }
}

export default Home;