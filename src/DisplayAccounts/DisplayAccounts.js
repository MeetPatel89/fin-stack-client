import React, { Component } from 'react';

export default class DisplayAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        console.log('DisplayAccounts component is rerendered!');
    fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
      .then((res) => res.json())
      .then((accounts) => {
        this.setState({
          accounts,
        });
      });
  }

    render() {
        const accounts = (this.state.accounts) && this.state.accounts.map((account, i) => {
            return (
                <div className="accounts" key={i}>
                    {account.accounts}
                </div>
            )
        })
        return (
            <div className="display-accounts">
                {accounts}
            </div>
        )
    }
}
