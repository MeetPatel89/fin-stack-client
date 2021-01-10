import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Header from './Header/Header';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpForm: false,
      signInForm: false,
    };
  }

  handleClick = (e) => {
      (e.target.textContent === "SignUp") ?
      this.setState(
          {
              signUpForm: true
          }
      ) :
      this.setState(
          {
              signInForm: true
          }
      )
  }

  render() {
    return (
      <>
        <Header />
        {this.state.signInForm ? (
          <>
            <SignIn />
          </>
        ) : this.state.signUpForm ? (
          <>
            <SignUp />
          </>
        ) : (
          <>
            <button onClick={this.handleClick}>SignUp</button>

            <br />
            <br />
            <button onClick={this.handleClick}>LogIn</button>
          </>
        )}
      </>
    );
  }
}
