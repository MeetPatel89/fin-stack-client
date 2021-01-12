import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import Categories from '../Categories/Categories';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: []
    }
  }

  render() {
    return (
      <>
        <div className='user'>{this.props.user}</div>
        <Nav handleClick={this.props.handleClick} />
        <Route path="/accounts" component={() => <Accounts userId={this.props.userId}/>} />
        <Route path="/categories" component={() => <Categories userId={this.props.userId} />} />
        
      </>
    );
  }
}
