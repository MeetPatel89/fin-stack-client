import React, { Component } from 'react';
import DisplayCategories from '../DisplayCategories/DisplayCategories';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseCat: [],
            balanceCat: [],
            displayExpense: false,
            displayBalance: false
        }
    }

    handleClick = (e) => {
        const textContent = e.target.textContent;
        if (textContent === 'Expense') {
            this.setState({
                displayExpense: true,
                displayBalance: false
            })
        } else {
            this.setState({
                displayExpense: false,
                displayBalance: true
            })
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/api/categories/${this.props.userId}`)
        .then(res => res.json())
        .then(categories => {
            console.log(categories)
            let expenseCat = [],
                balanceCat = [];
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].type === 'expense') {
                    expenseCat.push(categories[i].category)
                } else {
                    balanceCat.push(categories[i].category)
                }
            }
            this.setState({
                expenseCat,
                balanceCat
            })
        })
    }

    render() {
        return (
          <>
            <button type='button' onClick={this.handleClick}>
              Expense
            </button>
            <button type='button' onClick={this.handleClick}>
              Balance
            </button>
            {this.state.displayExpense && <DisplayCategories type={'expense'} />}
            {this.state.displayBalance && <DisplayCategories type={'balance'} />}
          </>
        );
    }
} 