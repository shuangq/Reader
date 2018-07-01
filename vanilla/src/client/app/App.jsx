import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { logout } from './utils/auth';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved from './components/Saved';
import Article from './components/Article';
import LoginForm from './components/LoginForm';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/saved" component={Saved} />
        <Route path="/article/:aid" component={Article} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" render={props => {
          logout();
          return <Redirect to="/" />;
        }} />
      </React.Fragment>
    );
  }
}

export default App;