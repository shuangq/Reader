import React from 'react';

const ListItem = (props) => {
    const handleSaveClick = () => {
        props.onSaveClick(props.id, props.ifSaved);
    };

    return (
    <div className="item-container">
        <div className="item">
            <div className="item-clickable-area" onClick={() => {props.onItemClick(props.id)}}>
            <div className="item-header">
            <img src={`/images/${props.imgUrl}`} alt={props.title} />
            </div>
            <div className="item-body">
                <h2 className="title" title={props.title}>{props.title}</h2>
            </div>
            </div>
            <div className="item-footer">
                <div className="info">
                    <span className="author">{props.author}</span>
                    <span className="date">{props.date}</span>
                </div>
                <div className="actions clearfix">
                    <i className={`btn-save far fa-heart ${props.ifSaved ? 'saved' : ''}`}
                    title={props.ifSaved ? 'Unsave article' : 'Save article'}
                    onClick={handleSaveClick} />
                </div>
            </div>
        </div>
    </div>
)};

export default ListItem;