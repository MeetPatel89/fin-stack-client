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
              signUpForm: true,
              signInForm: false
          }
      ) :
      this.setState(
          {
              signInForm: true,
              signUpForm: false
          }
      )
  }

  render() {
    return (
      <>
        <Header />
        {this.state.signInForm ? (
          <>
            <SignIn handleClick={this.handleClick}/>
          </>
        ) : this.state.signUpForm ? (
          <>
            <SignUp handleClick={this.handleClick}/>
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
