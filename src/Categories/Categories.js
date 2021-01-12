import React, { Component } from 'react';
import DisplayCategories from '../DisplayCategories/DisplayCategories';

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
      value: ''
    };
  }

  handleChange = (e) => {
      this.setState({
        value: e.target.value,
      });
  }

  handleClick = (e) => {
    const textContent = e.target.textContent;
    if (textContent === 'Add') {
        if (this.state.displayExpense) {
            console.log('Add expense')
            this.setState({
                addCategory: true,
                displayExpense: false
            })
        } else {
            console.log('Add balance')
            this.setState({
                addCategory: true,
                displayBalance: false
            })
        }
    }
    else if (textContent === 'Expense') {
      this.setState({
        displayExpense: true,
        displayBalance: false,
      });
    } else {
      this.setState({
        displayExpense: false,
        displayBalance: true,
      });
    }
  };

  handleSubmit = (e) => {
      e.preventDefault();
      
  }

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
      <>
      {(this.state.addCategory) ?
        <>
        <form onSubmit={this.handleSubmit}>
              <label htmlFor='category'>Category:</label>
              <input
                placeholder='e.g. Food or Salary'
                type='text'
                id='category'
                value={this.state.value}
                onChange={this.handleChange}
                required
              />
              <button className='category-submit' type='submit'>
                Submit
              </button>
              <button className='cancel' onClick={this.handleClick}>
                Cancel
              </button>
              {this.state.error}
            </form>
        </>  :
        <>
         <button type='button' onClick={this.handleClick}>
          Expense
        </button>
        <button type='button' onClick={this.handleClick}>
          Balance
        </button>
        </>
    }
       
        {this.state.displayExpense && (
            <>
          <DisplayCategories type="Expense" categories={this.state.expenseCat} />
          <button type="button" onClick={this.handleClick}>Add</button>
          </>
        )}
        {this.state.displayBalance && (
            <>
          <DisplayCategories type="Balance" categories={this.state.balanceCat} />
          <button type="button" onClick={this.handleClick}>Add</button>
          </>
        )}
      </>
    );
  }
}
