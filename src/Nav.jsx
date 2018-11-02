import React, {Component} from 'react';

class Nav extends Component {
  render() {

    let counter = this.props.count.count;

    return (<nav className="navbar">
          <a href="/" className="navbar-brand"><img src="../build/luau.png"/></a>
          <div>Users online: {counter}  </div>
      </nav>);
    


  }
}


export default Nav;