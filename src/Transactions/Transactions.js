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
      accounts: [],
      addTransaction: false,
      category: '',
      amount: '',
      account: '',
      date: '',
      time: ''
    };
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  handleClick = () => {
      this.setState(prevState => {
          return {
              addTransaction: !prevState.addTransaction
          }
      })
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
        [name]: e.target.value
    })
  }

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
        <>
        {(this.state.addTransaction) ?
            <form onSubmit={this.handleSubmit}>
            <label>
                Category:
                <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />
            </label>
            <label>
                Account:
                <input type="text" name="account" value={this.state.account} onChange={this.handleChange} />
            </label>
            <label>
                Amount(in dollars):
                <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
            </label>
            <label>
                Date:
                <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
            </label>
            <label>
                Time:
                <input type="time" name="time" value={this.state.time} onChange={this.handleChange} />
            </label>
            <button type="submit">Submit</button>
            <button type="button" onClick={this.handleClick}>Cancel</button>
        </form>
        :
            <div>
        <div className='date-picker'>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={(date) => this.handleDateChange(date)}
          />
        </div>
        {transactionsDisplay}
        
        <button type="button" onClick={this.handleClick}>Add</button>
      </div>
        }
      </>
    );
  }
}
