import React from 'react';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

const duration = 200;

const stateMachine = {
    hide: {
        transition: `all ${duration}ms ease-in-out`,
        transform: 'translateX(-100%)'
    },
    entering: {
        transform: 'translateX(-100%)',
    },
    entered: {
        transform: 'translateX(0)',
    },
    exiting: {
        transform: 'translateX(-100%)',
    },
    exited: {
        transform: 'translateX(-100%)',
    },
};

const Drawer = (props) => (
    <Transition in={props.inProp} timeout={{enter: 0, exit: 500}} mountOnEnter unmountOnExit>
    {
        (state) => (
            <div className="drawer-wrapper">
                <nav className="drawer" style={{
                    ...stateMachine['hide'],
                    ...stateMachine[state]
                }}>
                    <Link to="/login" className="tab tab-0">Login</Link>
                    <Link to="/" className="tab tab-1">Home</Link>
                    <Link to="/saved" className="tab tab-2">Saved</Link>
                </nav>
                <div className="drawer-overlay"
                    onClick={props.onBackgroundClick}
                ></div>
            </div>
        )
    }

    </Transition>

);

export default Drawer;