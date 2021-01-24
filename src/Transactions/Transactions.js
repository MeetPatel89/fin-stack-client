import React, { Component, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import EditTransaction from '../EditTransaction/EditTransaction';
import './Transactions.css';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      transactions: [],
      newTransaction: '',
      categories: [],
      newCategory: '',
      accounts: [],
      newAccount: '',
      addTransaction: false,
      category: '',
      amount: '',
      account: '',
      date: '',
      time: '',
      type: '',
      error: '',
      transactionClick: false,
    };
  }

  handleTransactionClick = (e) => {
    const transaction = e.target;
    const buttons = e.target.nextSibling.nextSibling;

    transaction.classList.remove('border-bottom');
    /*
    buttons.classList.remove('hidden');
    */
    buttons.classList.add('flex-row');
  };

  handleCancelClick = (e) => {
    const transaction = e.target.parentElement.previousSibling.previousSibling;
    const buttons = e.target.parentElement;
    /*
    buttons.classList.add('hidden');
    */
    buttons.classList.remove('flex-row');
    transaction.classList.add('border-bottom');
  };

  handleDeleteClick = (e) => {
    const transaction = e.target;
    const deleteId = transaction.id;
    console.log(deleteId);
    fetch(`http://localhost:8000/api/transactions/${deleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      this.setState((prevState) => {
        const postDeleteTransactions = prevState.transactions.filter(
          (transaction) => transaction.id !== parseInt(deleteId)
        );
        return {
          transactions: postDeleteTransactions,
        };
      })
    );
  };

  handleEditClick = (e) => {
    console.log('Edit clicked');
    const buttons = e.target.parentElement;
    const formElement = buttons.previousSibling;
    buttons.classList.remove('flex-row');
    formElement.classList.add('flex-col');
  };

  handleCancelEditClick = (e) => {
    console.log(e.target);
    const formElement = e.target.parentElement.parentElement;
    const transaction = formElement.previousSibling;
    formElement.classList.remove('flex-col');
    transaction.classList.add('border-bottom');
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
      newTransaction: '',
      newAccount: '',
      newCategory: '',
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
        newTransaction: '',
        newAccount: '',
        newCategory: '',
        error: '',
      };
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
      newTransaction: '',
      newAccount: '',
      newCategory: '',
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
        })
          .then((res) => res.json())
          .then((category) => {
            this.setState({
              newCategory: category[0],
            });
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
        })
          .then((res) => res.json())
          .then((account) => {
            this.setState({
              newAccount: account[0],
            });
          });
      }
      const datetime = new Date(
        `${this.state.date}T${this.state.time}`
      ).toISOString();
      const accounts = this.state.account.value;
      const category = this.state.category.value;
      const amount = this.state.amount;
      const type = this.state.type;
      const duplicateTransaction = this.state.transactions.find(
        (transaction) =>
          transaction.date_time === datetime &&
          transaction.accounts === accounts &&
          transaction.category === category &&
          transaction.amount === amount &&
          transaction.type === type
      );
      if (duplicateTransaction) {
        this.setState({
          error: 'The entered transaction already exists',
        });
      } else {
        const newTransaction = {
          accounts,
          category,
          amount,
          type,
          date_time: datetime,
        };
        fetch(`http://localhost:8000/api/transactions/${this.props.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTransaction),
        })
          .then((res) => res.json())
          .then((transaction) => {
            this.setState({
              newTransaction: transaction[0],
              addTransaction: false,
            });
          });
      }
    }
  };

  /*
  componentWillUnmount = () => {
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
  };
  */

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
    this.state.newTransaction &&
      this.state.transactions.push(this.state.newTransaction);
    this.state.newCategory &&
      this.state.categories.push(this.state.newCategory);
    this.state.newAccount && this.state.accounts.push(this.state.newAccount);

    const dailyTransactions =
      this.state.transactions &&
      this.state.transactions.filter(
        (transaction) =>
          new Date(transaction.date_time).toDateString() ===
          this.state.selectedDate.toDateString()
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

    const transactionsDisplay = dailyTransactions.length ? (
      dailyTransactions.map((transaction, i) => {
        let month = new Date(transaction.date_time).getMonth() + 1;
        if (month < 10) {
          month = `0${month}`;
        }
        let hour = new Date(transaction.date_time).getHours();
        let minutes = new Date(transaction.date_time).getMinutes();
        if (hour < 10) {
          hour = `0${hour}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return (
          <Fragment key={i}>
            <div
              id={transaction.id}
              className='individual-trx border-bottom'
              onClick={this.handleTransactionClick}
            >
              <div className='cat-date'>
                <span className='category'>{transaction.category}</span>
                <span className='date'>
                  {new Date(transaction.date_time).toDateString()}
                </span>
              </div>
              <div className='amt-account'>
                <span className='amount'>&#36;{transaction.amount}</span>

                <span className='account'>{transaction.accounts}</span>
              </div>
            </div>
            <EditTransaction
              identifier={i}
              handleChangeKey={this.props.handleChangeKey}
              handlePatchClick={this.handlePatchClick}
              userId={this.props.userId}
              id={transaction.id}
              category={{
                label: transaction.category,
                value: transaction.category,
              }}
              account={{
                label: transaction.accounts,
                value: transaction.accounts,
              }}
              type={{ label: transaction.type, value: transaction.type }}
              display='hidden'
              categories={categories}
              accounts={accounts}
              types={types}
              amount={transaction.amount}
              date={`${new Date(
                transaction.date_time
              ).getFullYear()}-${month}-${new Date(
                transaction.date_time
              ).getDate()}`}
              time={`${hour}:${minutes}`}
              handleCancelEditClick={this.handleCancelEditClick}
            />
            <div className='trx-buttons hidden'>
              <button
                id={transaction.id}
                type='button'
                onClick={this.handleDeleteClick}
              >
                Delete
              </button>
              <button type='button' onClick={this.handleEditClick}>
                Edit
              </button>
              <button type='button' onClick={this.handleCancelClick}>
                Cancel
              </button>
            </div>
          </Fragment>
        );
      })
    ) : (
      <div className='no-trx'>There are no transactions for this day</div>
    );

    return (
      <>
        {this.state.addTransaction ? (
          <section className='add-transaction'>
            <h2>Add Transaction</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='label-ctl'>
                <label htmlFor='categories'>Category:</label>
                <CreatableSelect
                  isClearable
                  id='categories'
                  rules={{ required: 'Please select an option' }}
                  onChange={this.handleCategoryChange}
                  options={categories}
                />
              </div>
              <div className='label-ctl'>
                <label htmlFor='accounts'>Account:</label>
                <CreatableSelect
                  isClearable
                  id='accounts'
                  onChange={this.handleAccountChange}
                  options={accounts}
                />
              </div>
              <div className='label-ctl'>
                <label htmlFor='type'>Type:</label>
                <Select
                  id='type'
                  onChange={this.handleTypeChange}
                  options={types}
                />
              </div>
              <div className='label-ctl'>
                <label htmlFor='amount'>Amount(in dollars):</label>
                <input
                  type='text'
                  name='amount'
                  id='amount'
                  value={this.state.amount}
                  onChange={this.handleChange}
                />
              </div>
              <div className='label-ctl'>
                <label htmlFor='date'>Date:</label>
                <input
                  type='date'
                  name='date'
                  id='date'
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </div>
              <div className='label-ctl'>
                <label htmlFor='time'>Time: </label>
                <input
                  type='time'
                  name='time'
                  id='time'
                  value={this.state.time}
                  onChange={this.handleChange}
                />
              </div>

              <button type='submit'>Submit</button>
              <button type='button' onClick={this.handleClick}>
                Cancel
              </button>
              <div className='err'>{this.state.error}</div>
            </form>
          </section>
        ) : (
          <div className='trx'>
            <div className='date-picker'>
              <DatePicker
                selected={this.state.selectedDate}
                onChange={(date) => this.handleDateChange(date)}
              />
            </div>
            <div className='display-transaction'> {transactionsDisplay}</div>

            <button
              className='add-trx'
              type='button'
              onClick={this.handleClick}
            >
              Add
            </button>
          </div>
        )}
      </>
    );
  }
}
