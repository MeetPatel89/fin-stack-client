import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddAccount from '../AddAccount/AddAccount';
import DisplayAccounts from '../DisplayAccounts/DisplayAccounts';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAccount: false,
    };
  }

  handleClick = (e) => {
    this.setState((prevState) => {
      return {
        addAccount: !prevState.addAccount,
      };
    });
  };

  render() {
    return (
      <>
        {this.state.addAccount ? (
          <AddAccount
            userId={this.props.userId}
            handleClick={this.handleClick}
          />
        ) : (
          <>
            <DisplayAccounts userId={this.props.userId} />
            <button type='button' onClick={this.handleClick}>
              Add Account
            </button>
          </>
        )}
      </>
    );
  }
}
