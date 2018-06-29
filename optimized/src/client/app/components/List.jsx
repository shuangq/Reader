import React from 'react';
import ListItem from './ListItem';

const List = (props) => props.items.map(item => (
    <ListItem
        key={item.id}
        id={item.id}
        title={item.title}
        author={item.author}
        date={item.date}
        imgUrl={item.imgUrl}
        ifSaved={item.ifSaved}
        onItemClick={props.onListItemClick}
        onSaveClick={props.onSaveClick}
    />
));


export default List;