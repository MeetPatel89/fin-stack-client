import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreatableSelect from 'react-select/creatable';

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

  handleCategoryChange = (e) => {
    console.log('Event activated');
    console.log(e);
    (e['__isNew__']) && console.log('This is a new input')
  }

  handleAccountChange = (e) => {
      console.log(e);
      e['__isNew__'] && console.log('This is a new input');
  }

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

  handleSubmit = (e) => {
      e.preventDefault();
      const datetime = `${this.state.date}T${this.state.time}`
      console.log(datetime);
      console.log(new Date(datetime).toISOString())
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

    const categories = this.state.categories.map(categoryObj => {
        return {
            value: categoryObj.category,
            label: categoryObj.category,
            name: 'Category'
        }
    })

    const accounts = this.state.accounts.map(accountObj => {
        return {
            value: accountObj.accounts,
            label: accountObj.accounts
        }
    })
    
    return (
        <>
        {(this.state.addTransaction) ?
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="categories">Choose Category:</label>
            <CreatableSelect
                isClearable
                id="categories"
                onChange={this.handleCategoryChange}
                options={categories}
            />
            <label htmlFor="accounts">Choose Account:</label>
            <CreatableSelect
                isClearable
                id="accounts"
                onChange={this.handleAccountChange}
                options={accounts}
            />
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
