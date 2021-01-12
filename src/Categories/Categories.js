import React, { Component } from 'react';

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenseCat: [],
            balanceCat: []
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
            <button type='button'>Expense</button>
            <button type='button'>Balance</button>
          </>
        );
    }
} 