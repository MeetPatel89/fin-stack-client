import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      const accounts = (this.props.accounts) && this.props.accounts.map(account => (
          <div>
            {account.accounts}
          </div>
      ))
      return (
        <>
          <div className='accounts'>
            {accounts}
            <Link to='/accounts/add'>
              <button className='add-accounts'>Add Account</button>
            </Link>
          </div>
        </>
      );
  }
}
