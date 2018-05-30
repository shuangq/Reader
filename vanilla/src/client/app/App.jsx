import React from 'react';
import { Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Saved from './components/Saved';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/saved" component={Saved} />
        </div>
      </div>
    );
  }
}

export default App;