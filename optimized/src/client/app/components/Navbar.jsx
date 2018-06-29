import React from 'react';
import Drawer from './Drawer';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifShowDrawer: false,
    };
  }

  hideDrawer = () => {
    this.setState({ ifShowDrawer: false });
  };
  
  showDrawer = () => {
    this.setState({ ifShowDrawer: true });
  };

  render() {
    return (
      <div className="navbar-shell">
        <nav className="navbar">
          <div className="btn-toggle-drawer" onClick={this.showDrawer} >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="navbar-logo">Reader</span>
        </nav>
        <Drawer inProp={this.state.ifShowDrawer} onBackgroundClick={this.hideDrawer}/>
      </div>
    );
  }
}

export default Navbar;