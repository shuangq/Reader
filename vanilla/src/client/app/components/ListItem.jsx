import React from 'react';

const ListItem = (props) => (
    <div className="item-container">
        <div className="item" onClick={() => {props.onItemClick(props.id)}}>
            <div className="item-header">
                <img src={props.imgUrl} alt={props.title} />
            </div>
            <div className="item-body">
                <h2 className="title" title={props.title}>{props.title}</h2>
            </div>
            <div className="item-footer">
                <div className="info">
                    <span className="author">{props.author}</span>
                    <span className="date">{props.date}</span>
                </div>
                <div className="actions clearfix">
                    <i className="btn-save far fa-heart" title="Saved article"></i>
                </div>
            </div>
        </div>
    </div>
);

export default ListItem;