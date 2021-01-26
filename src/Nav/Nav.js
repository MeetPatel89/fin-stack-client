import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
          <li>
            <Link to='/categories'>Categories</Link>
          </li>
          <li>
            <Link to='/accounts'>Accounts</Link>
          </li>
          <li id='log-out' onClick={this.props.handleClick}>
            LogOut
          </li>
        </ul>
      </nav>
    );
  }
}

Nav.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.string,
};

Nav.defaultProps = {
  handleClick: function () {
    return 'Handle Click';
  },
  user: 'RandomUser89',
};
