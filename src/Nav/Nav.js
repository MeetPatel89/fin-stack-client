import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <nav className='navigation'>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/transactions'>Transactions</Link>
          </li>
          <li><Link to='/categories'>Categories</Link></li>
          <li><Link to='/stats'>Stats</Link></li>
          <li><Link to='/accounts'>Accounts</Link></li>
          <li id="log-out" onClick={this.props.handleClick}>LogOut</li>
        </ul>
      </nav>
    );
  }
}
