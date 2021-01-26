import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import './EditTransaction.css';

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
      error: '',
    };
  }

  handleCategoryChange = (e) => {
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
    this.setState({
      type: {
        value: e.value,
        label: e.label,
      },
    });
  };

  handleChange = (e) => {
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
    if (
      this.props.account.value !== this.state.account.value ||
      this.props.amount !== this.state.amount ||
      this.props.category.value !== this.state.category.value ||
      this.props.date !== this.state.date ||
      this.props.time !== this.state.time ||
      this.props.type.value !== this.state.type.value
    ) {
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
            `${config.API_BASE_URL}/categories/${this.props.userId}`,
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
        Object.assign(updatedTransaction, {
          accounts: this.state.account.value,
        });
        if (this.state.account.isNew) {
          const newAccount = {
            accounts: this.state.account.value,
          };
          postAccount = fetch(
            `${config.API_BASE_URL}/accounts/${this.props.userId}`,
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
      const postTransaction = fetch(
        `${config.API_BASE_URL}/transactions/${this.props.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updatedTransaction),
        }
      );
      Promise.all([postCategory, postAccount, postTransaction]).then(() => {
        this.props.handleChangeKey();
      });
    } else {
      this.setState({
        error: 'Edit at least one field to submit',
      });
    }
  };

  render() {
    return (
      <form
        className={`trx-form ${this.props.display}`}
        onSubmit={this.handleSubmit}
      >
        <div className='label-ctl'>
          <label htmlFor='categories'>Category:</label>
          <CreatableSelect
            isClearable
            id='categories'
            onChange={this.handleCategoryChange}
            options={this.props.categories}
            value={this.state.category}
          />
        </div>
        <div className='label-ctl'>
          <label htmlFor='accounts'>Account:</label>
          <CreatableSelect
            isClearable
            id='accounts'
            onChange={this.handleAccountChange}
            options={this.props.accounts}
            value={this.state.account}
          />
        </div>
        <div className='label-ctl'>
          <label htmlFor='type'>Type:</label>
          <Select
            id='type'
            onChange={this.handleTypeChange}
            options={this.props.types}
            value={this.state.type}
          />
        </div>
        <div className='label-ctl'>
          <label htmlFor={`amount-${this.props.identifier}`}>
            Amount(in dollars):
          </label>
          <input
            type='text'
            name='amount'
            aria-label='transaction amount'
            aria-describedby='error'
            id={`amount-${this.props.identifier}`}
            value={this.state.amount}
            onChange={this.handleChange}
          />
        </div>
        <div className='label-ctl'>
          <label htmlFor={`date-${this.props.identifier}`}>Date:</label>
          <input
            type='date'
            name='date'
            aria-label='transaction date'
            aria-describedby='error'
            id={`date-${this.props.identifier}`}
            value={this.state.date}
            onChange={this.handleChange}
          />
        </div>
        <div className='label-ctl'>
          <label htmlFor={`time-${this.props.identifier}`}>Time:</label>
          <input
            type='time'
            name='time'
            aria-label='transaction time'
            aria-describedby='error'
            id={`time-${this.props.identifier}`}
            value={this.state.time}
            onChange={this.handleChange}
          />
        </div>
        <div className='edit-buttons'>
          <button type='submit'>Submit</button>
          <button type='button' onClick={this.props.handleCancelEditClick}>
            Cancel
          </button>
        </div>
        <div id='error' className='err'>
          {this.state.error}
        </div>
      </form>
    );
  }
}

EditTransaction.propTypes = {
  account: PropTypes.object,
  accounts: PropTypes.array,
  amount: PropTypes.string,
  categories: PropTypes.array,
  category: PropTypes.object,
  date: PropTypes.string,
  display: PropTypes.string,
  handleCancelEditClick: PropTypes.func,
  handleChangeKey: PropTypes.func,
  id: PropTypes.number,
  identifier: PropTypes.number,
  time: PropTypes.string,
  type: PropTypes.object,
  types: PropTypes.array,
  userId: PropTypes.number,
};

EditTransaction.defaultProps = {
  account: {},
  accounts: [],
  amount: '',
  categories: [],
  category: {},
  date: '',
  display: '',
  handleCancelEditClick: function () {},
  handleChangeKey: function () {},
  id: 1,
  identifier: 1,
  time: '',
  type: {},
  types: [],
  userId: 1,
};
