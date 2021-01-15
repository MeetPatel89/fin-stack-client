import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

export default class EditTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.category,
      account: this.props.account,
      type: this.props.type,
      amount: this.props.amount,
      date: this.props.date,
      time: this.props.time,
    };
  }

  handleCategoryChange = (e) => {
    console.log(e);
    if (e) {
      if (e['__isNew__']) {
        this.setState({
          category: {
            value: e.value,
            label: e.label,
            isNew: true,
          },
        });
      } else {
        this.setState({
          category: {
            value: e.value,
            label: e.label,
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
    console.log(e);
    if (e) {
      if (e['__isNew__']) {
        this.setState({
          account: {
            value: e.value,
            label: e.label,
            isNew: true,
          },
        });
      } else {
        this.setState({
          account: {
            value: e.value,
            label: e.label,
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
    console.log(e);
    this.setState({
      type: {
        value: e.value,
        label: e.label,
      },
    });
  };

  handleChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let updatedTransaction = {};
    let postCategory, postAccount;
    if (this.state.category.value !== this.props.category.value) {
      Object.assign(updatedTransaction, {
        category: this.state.category.value,
      });
      if (this.state.category.isNew) {
        const newCategory = {
          category: this.state.category.value,
          type: this.state.type.value,
        };
        postCategory = fetch(
          `http://localhost:8000/api/categories/${this.props.userId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
          }
        );
      }
    }
    if (this.state.account.value !== this.props.account.value) {
      Object.assign(updatedTransaction, { accounts: this.state.account.value });
      if (this.state.account.isNew) {
        const newAccount = {
          accounts: this.state.account.value,
        };
        postAccount = fetch(
          `http://localhost:8000/api/accounts/${this.props.userId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAccount),
          }
        );
      }
    }
    if (this.state.type.value !== this.props.type.value) {
      Object.assign(updatedTransaction, { type: this.state.type.value });
    }
    if (this.state.amount !== this.props.amount) {
      Object.assign(updatedTransaction, { amount: this.state.amount });
    }
    if (
      this.state.date !== this.props.date ||
      this.state.time !== this.props.time
    ) {
      Object.assign(updatedTransaction, {
        date_time: new Date(
          `${this.state.date}T${this.state.time}`
        ).toISOString(),
      });
    }
    console.log(updatedTransaction);
    const postTransaction = fetch(
      `http://localhost:8000/api/transactions/${this.props.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedTransaction),
      }
    );
    Promise.all([postCategory, postAccount, postTransaction]).then( () => {
    this.props.handleChangeKey();})
  };

  render() {
    return (
      <form className={this.props.display} onSubmit={this.handleSubmit}>
        <label htmlFor='categories'>Category:</label>
        <CreatableSelect
          isClearable
          id='categories'
          onChange={this.handleCategoryChange}
          options={this.props.categories}
          value={this.state.category}
        />
        <label htmlFor='accounts'>Account:</label>
        <CreatableSelect
          isClearable
          id='accounts'
          onChange={this.handleAccountChange}
          options={this.props.accounts}
          value={this.state.account}
        />
        <label htmlFor='type'>Type:</label>
        <Select
          id='type'
          onChange={this.handleTypeChange}
          options={this.props.types}
          value={this.state.type}
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
        <button type='button' onClick={this.props.handleCancelEditClick}>
          Cancel
        </button>
        {this.state.error}
      </form>
    );
  }
}
