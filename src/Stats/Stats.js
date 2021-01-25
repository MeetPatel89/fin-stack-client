import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import './Stats.css';

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
      <div className='stats'>
        <div className='stats-btns'>
          <button type='button' onClick={this.handleClick}>
            Expense
          </button>
          <button type='button' onClick={this.handleClick}>
            Balance
          </button>
        </div>

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
              responsive: true,
              legend: {
                display: false,
                padding: 0,
                boxWidth: 10,
                position: 'bottom',
                labels: {
                  fontColor: '#f7f0f5',
                  fontSize: 13,
                  usePointStyle: true,
                },
              },
              tooltips: {
                titleFontColor: '#f7f0f5',
                titleFontSize: 13,
                bodyFontSize: 13,
              },
              title: {
                display: false,
                text: 'Expense in US Dollars',
                fontColor: '#f7f0f5',
                fontSize: 15,
              },
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
                display: false,
                position: 'bottom',
                padding: 0,
                labels: {
                  fontColor: '#f7f0f5',
                  fontSize: 13,
                  usePointStyle: true,
                  fullWidth: true,
                },
              },
              tooltips: {
                titleFontColor: 'black',
                titleFontSize: 13,
                bodyFontSize: 13,
              },
              title: {
                display: false,
                text: 'Balance in US Dollars',
                fontColor: '#f7f0f5',
                fontSize: 15,
              },
            }}
          />
        )}
        <button type='button' onClick={this.props.handleClick}>
          Back
        </button>
      </div>
    );
  }
}
