import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import Categories from '../Categories/Categories';
import Transactions from '../Transactions/Transactions';
import Spending from '../Spending/Spending';
import Stats from '../Stats/Stats';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
 

  render() {
    return (
      <>
        <div className='user'>{this.props.user}</div>
        <Nav handleClick={this.props.handleClick} />
        <Route
          path='/accounts'
          component={() => <Accounts userId={this.props.userId} />}
        />
        <Route
          path='/categories'
          component={() => <Categories userId={this.props.userId} />}
        />
        <Route
          path='/transactions'
          component={() => <Transactions userId={this.props.userId} />}
        />
        <Route
          exact
          path='/'
          component={() => <Spending userId={this.props.userId} />}
        />
        <Route path="/stats" component={() => <Stats />} />
      </>
    );
  }
}
