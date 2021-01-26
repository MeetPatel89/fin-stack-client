import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Accounts from '../Accounts/Accounts';
import Categories from '../Categories/Categories';
import Transactions from '../Transactions/Transactions';
import Spending from '../Spending/Spending';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  handleChangeKey = () => {
    this.setState((prevState) => {
      return {
        key: prevState.key + 1,
      };
    });
  };

  render() {
    return (
      <>
        <Header user={this.props.user} />
        <Nav user={this.props.user} handleClick={this.props.handleClick} />
        <main>
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
            component={() => (
              <Transactions
                key={this.state.key}
                handleChangeKey={this.handleChangeKey}
                userId={this.props.userId}
              />
            )}
          />
          <Route
            exact
            path='/'
            component={() => <Spending userId={this.props.userId} />}
          />
        </main>
        <footer>
          <p>&#169;Meet 2021</p>
        </footer>
      </>
    );
  }
}

HomePage.propTypes = {
  handleClick: PropTypes.func,
  user: PropTypes.string,
  userId: PropTypes.number,
};

HomePage.defaultProps = {
  handleClick: function () {
    return 'Handle Click';
  },
  user: 'RandomUser89',
  userId: 1,
};
