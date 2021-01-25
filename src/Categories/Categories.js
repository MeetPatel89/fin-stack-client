import React, { Component } from 'react';
import DisplayCategories from '../DisplayCategories/DisplayCategories';
import './Categories.css';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseCat: [],
      newExpenseCat: '',
      balanceCat: [],
      newBalanceCat: '',
      displayExpense: false,
      displayBalance: false,
      addCategory: false,
      value: '',
      error: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleClick = (e) => {
    const textContent = e.target.textContent;
    if (textContent === 'Add') {
      if (this.state.displayExpense) {
        console.log('Add expense');
        this.setState({
          addCategory: true,
          newBalanceCat: '',
          newExpenseCat: '',
        });
      } else {
        console.log('Add balance');
        this.setState({
          addCategory: true,
          newBalanceCat: '',
          newExpenseCat: '',
        });
      }
    } else if (textContent === 'Expense') {
      this.setState({
        displayExpense: true,
        displayBalance: false,
      });
    } else if (textContent === 'Balance') {
      this.setState({
        displayExpense: false,
        displayBalance: true,
      });
    } else {
      e.preventDefault();
      this.setState({
        addCategory: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.displayExpense) {
      const duplicateCat = this.state.expenseCat.find(
        (category) => category === this.state.value
      );
      if (duplicateCat) {
        this.setState({
          error: 'The given expense category already exists',
        });
      } else {
        const newCategory = {
          category: this.state.value,
          type: 'expense',
        };
        fetch(`http://localhost:8000/api/categories/${this.props.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        })
          .then((res) => res.json())
          .then((categoryObj) => {
            this.setState({
              addCategory: false,
              newExpenseCat: categoryObj[0].category,
              value: '',
            });
          });
      }
    } else {
      const duplicateCat = this.state.balanceCat.find(
        (category) => category === this.state.value
      );
      if (duplicateCat) {
        this.setState({
          error: 'The given balance category already exists',
        });
      } else {
        const newCategory = {
          category: this.state.value,
          type: 'balance',
        };
        fetch(`http://localhost:8000/api/categories/${this.props.userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        })
          .then((res) => res.json())
          .then((categoryObj) => {
            this.setState({
              addCategory: false,
              newBalanceCat: categoryObj[0].category,
              value: '',
            });
          });
      }
    }
  };

  componentDidMount() {
    fetch(`http://localhost:8000/api/categories/${this.props.userId}`)
      .then((res) => res.json())
      .then((categories) => {
        console.log(categories);
        let expenseCat = [],
          balanceCat = [];
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].type === 'expense') {
            expenseCat.push(categories[i].category);
          } else {
            balanceCat.push(categories[i].category);
          }
        }
        this.setState({
          expenseCat,
          balanceCat,
        });
      });
  }

  render() {
    return (
      <div className='cats'>
        <div className='cats-btns'>
          <button type='button' onClick={this.handleClick}>
            Expense
          </button>
          <button type='button' onClick={this.handleClick}>
            Balance
          </button>
        </div>

        {this.state.displayExpense && (
          <>
            <DisplayCategories
              type='Expense'
              newExpenseCat={this.state.newExpenseCat}
              categories={this.state.expenseCat}
            />
            <button type='button' onClick={this.handleClick}>
              Add
            </button>
          </>
        )}
        {this.state.displayBalance && (
          <>
            <DisplayCategories
              type='Balance'
              newBalanceCat={this.state.newBalanceCat}
              categories={this.state.balanceCat}
            />
            <button type='button' onClick={this.handleClick}>
              Add
            </button>
          </>
        )}
        {this.state.addCategory && (
          <>
            <form className='add-category-form' onSubmit={this.handleSubmit}>
              <div className='label-ctl'>
                <label htmlFor='category'>Category:</label>
                <input
                  placeholder='e.g. Food'
                  type='text'
                  id='category'
                  value={this.state.value}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className='add-category-btns'>
                <button className='category-submit' type='submit'>
                  Submit
                </button>
                <button className='cancel' onClick={this.handleClick}>
                  Cancel
                </button>
              </div>
              <div className='err'>{this.state.error}</div>
            </form>
          </>
        )}
      </div>
    );
  }
}
