import React, { Component } from 'react';

export default class Spending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      expense: '',
    };
  }

  componentDidMount() {
    const transactions = fetch(
      `http://localhost:8000/api/transactions/${this.props.userId}`
    ).then((res) => res.json());
    const categories = fetch(
      `http://localhost:8000/api/categories/${this.props.userId}`
    ).then((res) => res.json());

    Promise.all([transactions, categories]).then((response) => {
      const transactions = response[0];
      const categories = response[1];
      console.log(transactions);
      console.log(categories);
      let expense = 0,
        balance = 0,
        expenseDetail = [],
        balanceDetail = [];
    });
  }

  render() {
    return (
      <>
        <h2>Expenditure</h2>
        <div className='balance'>
          <span>Balance</span>
          <span>{this.props.balance}</span>
        </div>
        <div className='expense'>
          <div className='total-expense'>
            <span>Expense</span>
            <span>{this.props.expense}</span>
          </div>
          <div className='classify-expense'></div>
        </div>
      </>
    );
  }
}
