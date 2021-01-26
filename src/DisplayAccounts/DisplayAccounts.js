import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DisplayAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  render() {
    let accounts = this.props.accounts;
    if (accounts) {
      const duplicateAccount = accounts.find(
        (account) => account === this.props.newAccount
      );
      if (!duplicateAccount) {
        if (this.props.newAccount) {
          accounts.push(this.props.newAccount);
        }
      }
    }

    const accountsToDisplay =
      accounts &&
      accounts.map((account, i) => {
        return (
          <div className='accounts' key={i}>
            {account}
          </div>
        );
      });
    return <div className='display-accounts'>{accountsToDisplay}</div>;
  }
}

DisplayAccounts.propTypes = {
  accounts: PropTypes.array,
  newAccount: PropTypes.string,
  userId: PropTypes.number,
};

DisplayAccounts.defaultProps = {
  accounts: [],
  newAccount: '',
  userId: 1,
};
