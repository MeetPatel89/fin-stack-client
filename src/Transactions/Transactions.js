import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      transactions: [],
      categories: [],
      accounts: []
    };
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  componentDidMount() {
     const transactions = fetch(`http://localhost:8000/api/transactions/${this.props.userId}`)
        .then(res => res.json())
    const categories = fetch(
      `http://localhost:8000/api/categories/${this.props.userId}`)
        .then(res => res.json())
    
    const accounts = fetch(
      `http://localhost:8000/api/accounts/${this.props.userId}`
    ).then(res => res.json());
    Promise.all([transactions, categories, accounts])
            .then(response => {
                this.setState({
                    transactions: response[0],
                    categories: response[1],
                    accounts: response[2]
                })
            })
  }

  render() {
    const dates = this.state.transactions.map(transaction => new Date(transaction.date_time).toDateString());
    console.log(dates);
    const dailyTransactions = (this.state.transactions) &&
        this.state.transactions.filter(transaction => new Date(transaction.date_time).toDateString() === this.state.selectedDate.toDateString())
    const transactionsDisplay = (dailyTransactions.length) ?
        dailyTransactions.map((transaction, i) => (
            <div key = {i} className="display-transaction">
            <span className="category">{transaction.category}</span>
            <span className="amount">{transaction.amount}</span>
            <span className="date">{new Date(transaction.date_time).toDateString()}</span>
            <span className="account">{transaction.accounts}</span>

        </div>
        )) :
        <div className="no-transactions">There are no transactions for this day</div>
    
    return (
      <div>
        <div className='date-picker'>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={(date) => this.handleChange(date)}
          />
        </div>
        {transactionsDisplay}
      </div>
    );
  }
}
