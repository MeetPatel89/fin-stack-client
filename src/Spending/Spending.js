import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import Stats from '../Stats/Stats';
import './Spending.css';

export default class Spending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [],
      expense: [],
      totalBalance: '',
      totalExpense: '',
      showStats: false,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      showStats: !prevState.showStats,
    }));
  };

  componentDidMount() {
    const transactions = fetch(
      `${config.API_BASE_URL}/transactions/${this.props.userId}`
    ).then((res) => res.json());
    const categories = fetch(
      `${config.API_BASE_URL}/categories/${this.props.userId}`
    ).then((res) => res.json());

    Promise.all([transactions, categories]).then((response) => {
      const transactions = response[0];
      const categories = response[1];
      let transactionsDisplay = categories.map((category) => {
        return {
          category: category.category,
          amount: 0,
          type: category.type,
        };
      });
      for (let i = 0; i < transactions.length; i++) {
        for (let j = 0; j < transactionsDisplay.length; j++) {
          if (transactions[i].category === transactionsDisplay[j].category) {
            transactionsDisplay[j].amount += parseFloat(transactions[i].amount);
          }
        }
      }
      transactionsDisplay = transactionsDisplay.filter(
        (transaction) => transaction.amount !== 0
      );
      const balance = transactionsDisplay.filter(
        (transaction) => transaction.type === 'balance'
      );
      const expense = transactionsDisplay.filter(
        (transaction) => transaction.type === 'expense'
      );
      let totalBalance = 0,
        totalExpense = 0;
      for (let i = 0; i < balance.length; i++) {
        totalBalance += balance[i].amount;
      }
      for (let i = 0; i < expense.length; i++) {
        totalExpense += expense[i].amount;
      }
      this.setState({
        balance,
        expense,
        totalBalance,
        totalExpense,
      });
    });
  }

  render() {
    const balanceDisplay =
      this.state.balance &&
      this.state.balance.map((balance, i) => (
        <Fragment key={i}>
          <span className='margin'>{balance.category}</span>
          <span className='margin'>
            &#36;{parseFloat(balance.amount).toFixed(2)}
          </span>
          <br />
        </Fragment>
      ));

    const expenseDisplay =
      this.state.expense &&
      this.state.expense.map((expense, i) => (
        <Fragment key={i}>
          <span className='margin'>{expense.category}</span>
          <span className='margin'>
            &#36;{parseFloat(expense.amount).toFixed(2)}
          </span>
          <br />
        </Fragment>
      ));

    return (
      <>
        {this.state.showStats ? (
          <Stats
            balance={this.state.balance}
            expense={this.state.expense}
            handleClick={this.handleClick}
          />
        ) : (
          <>
            <section className='expenditure'>
              <h2 className='spending'> Expenditure </h2>
              <div className='balance'>
                <span className='margin'>Balance</span>
                <span className='margin'>
                  &#36;{parseFloat(this.state.totalBalance).toFixed(2)}
                </span>
              </div>
              <div className='balance-type'>{balanceDisplay}</div>

              <div className='expense'>
                <span className='margin'>Expense</span>
                <span className='margin'>
                  &#36;{parseFloat(this.state.totalExpense).toFixed(2)}
                </span>
              </div>
              <div className='expense-type'>{expenseDisplay}</div>

              <button type='button' onClick={this.handleClick}>
                Stats
              </button>
            </section>
          </>
        )}
      </>
    );
  }
}

Spending.propTypes = {
  userId: PropTypes.number,
};

Spending.defaultProps = {
  userId: 1,
};
