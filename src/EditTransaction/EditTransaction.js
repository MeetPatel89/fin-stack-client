import React, { Component } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

export default class EditTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
          <form className={this.props.display} onSubmit={this.handleSubmit}>
            <label htmlFor='categories'>Category:</label>
            <CreatableSelect
              isClearable
              id='categories'
              onChange={this.handleCategoryChange}
              options={this.props.categories}
              value={this.props.category}
              
            />
            <label htmlFor='accounts'>Account:</label>
            <CreatableSelect
              isClearable
              id='accounts'
              onChange={this.handleAccountChange}
              options={this.props.accounts}
              value={this.props.account}
            />
            <label htmlFor='type'>Type:</label>
            <Select
              id='type'
              onChange={this.handleTypeChange}
              options={this.props.types}
              value={this.props.type}
            />
            <label>
              Amount(in dollars):
              <input
                type='text'
                name='amount'
                value={this.props.amount}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Date:
              <input
                type='date'
                name='date'
                value={this.props.date}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Time:
              <input
                type='time'
                name='time'
                value={this.props.time}
                onChange={this.handleChange}
              />
            </label>
            <button type='submit'>Submit</button>
            <button type='button' onClick={this.handleClick}>
              Cancel
            </button>
            {this.state.error}
          </form>
        );
    }
}