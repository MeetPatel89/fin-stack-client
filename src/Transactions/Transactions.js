import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

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
      time: '',
      error: '',
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
    if (e) {
      if (e['__isNew__']) {
        this.setState({
          category: {
            value: e.value,
            isNew: true,
          },
        });
      } else {
        this.setState({
          category: {
            value: e.value,
            isNew: false,
          },
        });
      }
    } else {
      this.setState({
        category: '',
      });
    }
  };

  handleAccountChange = (e) => {
    if (e) {
      if (e['__isNew__']) {
        this.setState({
          account: {
            value: e.value,
            isNew: true,
          },
        });
      } else {
        this.setState({
          account: {
            value: e.value,
            isNew: false,
          },
        });
      }
    } else {
      this.setState({
        account: '',
      });
    }
  };

  handleTypeChange = (e) => {
    this.setState({
      type: e.value,
    });
  };

  handleClick = () => {
    this.setState((prevState) => {
      return {
        addTransaction: !prevState.addTransaction,
      };
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.category) {
      this.setState({
        error: 'Please select a category',
      });
    } else if (!this.state.account) {
      this.setState({
        error: 'Please select an account',
      });
    } else if (!this.state.type) {
      this.setState({
        error: 'Please select a type',
      });
    } else if (!this.state.amount) {
      this.setState({
        error: 'Please enter an amount',
      });
    } else if (!this.state.date) {
      this.setState({
        error: 'Please select a date',
      });
    } else if (!this.state.time) {
      this.setState({
        error: 'Please select a time',
      });
    } else {
      if (this.state.category.isNew) {
        const newCategory = {
          category: this.state.category.value,
          type: this.state.type,
        };
        fetch(`http://localhost:8000/api/categories/${this.props.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        });
      }
      if (this.state.account.isNew) {
        const newAccount = {
          accounts: this.state.account.value,
        };
        fetch(`http://localhost:8000/api/accounts/${this.props.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAccount),
        });
      }
      const datetime = new Date(`${this.state.date}T${this.state.time}`).toISOString();
      const accounts = this.state.account.value;
      const category = this.state.category.value;
      const amount = this.state.amount;
      const duplicateTransaction = this.state.transactions.find(transaction => transaction.date_time === datetime && transaction.accounts === accounts && transaction.category === category && transaction.amount === amount);
      if (duplicateTransaction) {
          this.setState({
              error: 'The entered transaction already exists'
          })
      } else {
          const newTransaction = {
              accounts,
              category,
              amount,
              date_time: datetime
          }
          fetch(`http://localhost:8000/api/transactions/${this.props.userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction),
          });
      }

    }
  };

  componentDidMount() {
    const transactions = fetch(
      `http://localhost:8000/api/transactions/${this.props.userId}`
    ).then((res) => res.json());
    const categories = fetch(
      `http://localhost:8000/api/categories/${this.props.userId}`
    ).then((res) => res.json());

    const accounts = fetch(
      `http://localhost:8000/api/accounts/${this.props.userId}`
    ).then((res) => res.json());
    Promise.all([transactions, categories, accounts]).then((response) => {
      this.setState({
        transactions: response[0],
        categories: response[1],
        accounts: response[2],
      });
    });
  }

  render() {
    const dailyTransactions =
      this.state.transactions &&
      this.state.transactions.filter(
        (transaction) =>
          new Date(transaction.date_time).toDateString() ===
          this.state.selectedDate.toDateString()
      );
    const transactionsDisplay = dailyTransactions.length ? (
      dailyTransactions.map((transaction, i) => (
        <div key={i} className='display-transaction'>
          <span className='category'>{transaction.category}</span>
          <span className='amount'>{transaction.amount}</span>
          <span className='date'>
            {new Date(transaction.date_time).toDateString()}
          </span>
          <span className='account'>{transaction.accounts}</span>
        </div>
      ))
    ) : (
      <div className='no-transactions'>
        There are no transactions for this day
      </div>
    );

    const categories = this.state.categories.map((categoryObj) => {
      return {
        value: categoryObj.category,
        label: categoryObj.category,
      };
    });

    const accounts = this.state.accounts.map((accountObj) => {
      return {
        value: accountObj.accounts,
        label: accountObj.accounts,
      };
    });

    const types = [
      {
        value: 'expense',
        label: 'Expense',
      },
      {
        value: 'balance',
        label: 'Balance',
      },
    ];

    return (
      <>
        {this.state.addTransaction ? (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='categories'>Category:</label>
            <CreatableSelect
              isClearable
              id='categories'
              rules={{ required: 'Please select an option' }}
              onChange={this.handleCategoryChange}
              options={categories}
            />
            <label htmlFor='accounts'>Account:</label>
            <CreatableSelect
              isClearable
              id='accounts'
              onChange={this.handleAccountChange}
              options={accounts}
            />
            <label htmlFor='type'>Type:</label>
            <Select
              id='type'
              onChange={this.handleTypeChange}
              options={types}
            />
            <label>
              Amount(in dollars):
              <input
                type='text'
                name='amount'
                value={this.state.amount}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Date:
              <input
                type='date'
                name='date'
                value={this.state.date}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Time:
              <input
                type='time'
                name='time'
                value={this.state.time}
                onChange={this.handleChange}
              />
            </label>
            <button type='submit'>Submit</button>
            <button type='button' onClick={this.handleClick}>
              Cancel
            </button>
            {this.state.error}
          </form>
        ) : (
          <div>
            <div className='date-picker'>
              <DatePicker
                selected={this.state.selectedDate}
                onChange={(date) => this.handleDateChange(date)}
              />
            </div>
            {transactionsDisplay}

            <button type='button' onClick={this.handleClick}>
              Add
            </button>
          </div>
        )}
      </>
    );
  }
}
