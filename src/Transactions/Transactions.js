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
      accounts: []
    };
  }

  handleChange = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

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
    return (
      <>
        <div className='date-picker'>
          <DatePicker
            selected={this.state.selectedDate}
            onChange={(date) => this.handleChange(date)}
          />
        </div>

        <p>Hello Transactions</p>
      </>
    );
  }
}
