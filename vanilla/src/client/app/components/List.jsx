import React from 'react';
import ListItem from './ListItem';

const List = (props) => props.items.map(item => (
    <ListItem
        title={item.title}
        author={item.author}
        date={item.date}
        imgUrl={item.imgUrl}
    />
));


export default List;