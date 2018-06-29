import React from 'react';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import * as Auth from '../utils/auth';

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

const Drawer = (props) => {
    const ifAuth = Auth.checkIfAuth();
    const firstName = ifAuth ? Auth.getUserFirstName() : null;

    const handleLogout = () => {
        Auth.logout();
    };

    const CustomLink = ({to, className, children}) => {
        return <Link to={to} className={className} onClick={props.onBackgroundClick}>{children}</Link>;
    };

    return (
        <Transition in={props.inProp} timeout={{ enter: 0, exit: 500 }} mountOnEnter unmountOnExit>
            {
                (state) => (
                    <div className="drawer-wrapper">
                        <nav className="drawer" style={{
                            ...stateMachine['hide'],
                            ...stateMachine[state]
                        }}>
                            {
                                ifAuth ? (
                                    <p className="hello-msg">
                                        👋🏻<br />
                                        Hello, <span>{firstName}!</span>
                                    </p>
                                ) :
                                    (<CustomLink to="/login" className="tab tab-0">Login</CustomLink>)
                            }
                            <CustomLink to="/" className="tab tab-1">Home</CustomLink>
                            <CustomLink to="/saved" className="tab tab-2">Saved</CustomLink>
                            {ifAuth && <CustomLink className="tab tab-0" to="/logout">Logout</CustomLink>
                            }
                        </nav>
                        <div className="drawer-overlay"
                            onClick={props.onBackgroundClick}
                        ></div>
                    </div>
                )
            }
        </Transition>
    );
};

export default Drawer;