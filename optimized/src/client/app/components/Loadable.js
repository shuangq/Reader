import React from 'react';
import Loader from './Loader';
import L from 'react-loadable';

const Loading = (props) => {
    if(props.error) {
        return <div className="load-err-container"><p style={{textAlign: 'center'}}>Error!</p> <button onClick={props.retry}>Retry</button></div>;
    } else {
        return <Loader />;
    }
};

const Loadable = opts => L({
    loading: Loading,
    delay: 300,
    ...opts
});

export default Loadable;