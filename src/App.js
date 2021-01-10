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
            <button>SignUp</button>

            <br />
            <br />
            <button>LogIn</button>
          </>
        )}
      </>
    );
  }
}
