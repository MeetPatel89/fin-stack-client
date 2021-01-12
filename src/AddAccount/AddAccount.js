import React, { Component } from 'react';

export default class AddAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
            .then(res => res.json())
            .then(accounts => {
                const duplicateAccount = accounts.filter(account => account.accounts === this.state.value)
                if (duplicateAccount.length) {
                  this.setState({
                    error: 'The entered account already exists',
                  });
                } else {
                  const newAccount = {
                    accounts: this.state.value,
                  };
                  fetch(
                    `http://localhost:8000/api/accounts/${this.props.userId}`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(newAccount),
                    }
                  ).then(this.props.handleClick());
                }
            })
        
    }

    render () {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="account">
                        Name:
                    </label>
                    <input placeholder="discover bank" type="text" id="account" value={this.state.value} onChange={this.handleChange} required />
                    <button className="account-submit" type="submit">Submit</button>
                    {this.state.error}
                    <button className="cancel" onClick={this.props.handleClick}>Cancel</button>
                </form>
            </>
        )
    }
}