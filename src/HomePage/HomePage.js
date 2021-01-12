import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    fetch(`http://localhost:8000/api/accounts/${this.props.userId}`)
      .then(res => res.json())
      .then(accounts => console.log(accounts))
  }

  render() {
    return (
      <>
        <div className='user'>{this.props.user}</div>
        <Nav handleClick={this.props.handleClick} />
        
      </>
    );
  }
}
