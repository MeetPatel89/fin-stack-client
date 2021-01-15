import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExpense: true,
    };
  }

  handleClick = (e) => {
    if (e.target.textContent === 'Expense') {
      this.setState({
        showExpense: true,
      });
    } else {
      this.setState({
        showExpense: false,
      });
    }
  };

  render() {
    const balanceLabels = this.props.balance.map((balance) => balance.category);
    const balanceData = this.props.balance.map((balance) => balance.amount);
    const expenseLabels = this.props.expense.map((expense) => expense.category);
    const expenseData = this.props.expense.map((expense) => expense.amount);
    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    const balanceColors = this.props.balance.map((balance) => getRandomColor());
    const expenseColors = this.props.expense.map((expense) => getRandomColor());
    return (
      <>
        <button type='button' onClick={this.handleClick}>
          Expense
        </button>
        <button type='button' onClick={this.handleClick}>
          Balance
        </button>
        {this.state.showExpense ? (
          <Pie
            data={{
              labels: expenseLabels,
              datasets: [
                {
                  label: 'Expense(Dollars)',
                  backgroundColor: expenseColors,
                  data: expenseData,
                },
              ],
            }}
            options={{
              legend: {
                labels: {
                  fontColor: 'black',
                  fontSize: 18,
                },
              },
              tooltips: {
                titleFontColor: 'black',
                titleFontSize: 15,
                bodyFontSize: 15
              },
              title: {
                  display: true,
                  text: 'Expense in US Dollars',
                  fontColor: 'black',
                  fontSize: 20
              }
            }}
          />
        ) : (
          <Pie
            data={{
              labels: balanceLabels,
              datasets: [
                {
                  label: 'Balance(Dollars)',
                  backgroundColor: balanceColors,
                  data: balanceData,
                },
              ],
            }}
            options={{
              legend: {
                labels: {
                  fontColor: 'black',
                  fontSize: 18,
                },
              },
              tooltips: {
                titleFontColor: 'black',
                titleFontSize: 15,
                bodyFontSize: 15
              },
              title: {
                  display: true,
                  text: 'Balance in US Dollars',
                  fontColor: 'black',
                  fontSize: 20
              }
            }}
          />
        )}
        <button type='button' onClick={this.props.handleClick}>
          Back
        </button>
      </>
    );
  }
}
