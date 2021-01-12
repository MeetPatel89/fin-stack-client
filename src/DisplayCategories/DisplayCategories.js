import React, { Component } from 'react';

export default class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <p>Hello {this.props.type} categories</p>
    )
  }
}
