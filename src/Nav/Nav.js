import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <nav className='navigation'>
            <ul className='nav-links'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>Spending</li>
              <li>Transactions</li>
              <li>Stats</li>
              <li>Accounts</li>
              <li onClick={this.props.handleClick}>LogOut</li>
            </ul>
          </nav>
        );
    }
}