import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddAccount from '../AddAccount/AddAccount';
import DisplayAccounts from '../DisplayAccounts/DisplayAccounts';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: '',
      addAccount: false,
      newAccount: ''
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        addAccount: !prevState.addAccount,
      };
    });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
      .then((res) => res.json())
      .then((accounts) => {
        const duplicateAccount = accounts.filter(
          (account) => account.accounts === this.state.value
        );
        if (duplicateAccount.length) {
          this.setState({
            error: 'The entered account already exists',
          });
        } else {
          const newAccount = {
            accounts: this.state.value,
          };
          fetch(`http://localhost:8000/api/accounts/${this.props.userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
          }).then(res => res.json())
            .then(account => {
                console.log(account[0].accounts)
                this.setState(prevState => {
                    return {
                        newAccount: account[0].accounts,
                        addAccount: false
                    }
                })
            })
            
        }
      });
  };

  componentDidMount() {
    console.log('DisplayAccounts component is rerendered!');
    fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
      .then((res) => res.json())
      .then((accountObj) => {
          const accounts = accountObj.map(account => account.accounts)
        this.setState({
          accounts,
        });
      });
  }

  render() {
    return (
      <>
        {this.state.addAccount ? (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='account'>Name:</label>
            <input
              placeholder='discover bank'
              type='text'
              id='account'
              value={this.state.value}
              onChange={this.handleChange}
              required
            />
            <button className='account-submit' type='submit'>
              Submit
            </button>
            {this.state.error}
              <button className='cancel' onClick={this.handleClick}>Cancel</button>
          </form>
        ) : (
          <>
            <DisplayAccounts
              userId={this.props.userId}
              newAccount={this.state.newAccount}
              accounts={this.state.accounts}
            />
            <button type='button' onClick={this.handleClick}>
              Add Account
            </button>
          </>
        )}
      </>
    );
  }
}
