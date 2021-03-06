import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { logout } from './utils/auth';
import PrivateRoute from './components/PrivateRoute';
import Loadable from './components/Loadable';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/saved" component={Loadable({loader: () => import(/* webpackChunkName: 'saved', webpackPrefetch: true */'./components/Saved')})}/>
        <Route path="/article/:aid" component={Loadable({loader: () => import(/* webpackChunkName: 'article', webpackPrefetch: true */'./components/Article')})} />
        <Route path="/login" component={Loadable({loader: () => import(/* webpackChunkName: 'login ', webpackPrefetch: true */'./components/LoginForm')})} />
        <Route path="/logout" render={props => {
          logout();
          return <Redirect to="/" />;
        }} />
      </React.Fragment>
    );
  }
}

export default App;