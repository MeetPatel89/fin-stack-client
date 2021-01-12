import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
      .then(res => res.json())
      .then(accounts => {
        this.setState({
          accounts
        })
      })
  }

  render() {
    return (
      <>
        <div className='user'>{this.props.user}</div>
        <Nav handleClick={this.props.handleClick} />
        <Route path="/accounts" component={() => <Accounts accounts={this.state.accounts}/>} />
      </>
    );
  }
}
