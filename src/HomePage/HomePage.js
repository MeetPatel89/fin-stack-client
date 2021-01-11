import React, { Component } from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';

export default class HomePage extends Component {
  render() {
    return (
      <>
        <div className='user'>{this.props.user}</div>
        <Nav handleClick={this.props.handleClick} />
      </>
    );
  }
}
