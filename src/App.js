import React, { Component } from 'react';
import Header from './Header/Header';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpForm: false,
      signInForm: false,
    };
  }

  handleClick = (e) => {
    e.target.textContent === 'SignUp'
      ? this.setState({
          signUpForm: true,
          signInForm: false,
        })
      : this.setState({
          signInForm: true,
          signUpForm: false,
        });
  };

  render() {
    return (
      <>
        {this.state.signInForm ? (
          <>
            <SignIn handleClick={this.handleClick} />
          </>
        ) : this.state.signUpForm ? (
          <>
            <SignUp handleClick={this.handleClick} />
          </>
        ) : (
          <>
            <Header />
            <main className='main-container'>
              <div className='buttons'>
                <button className='btn' onClick={this.handleClick}>
                  SignUp
                </button>
                <br />
                <br />
                <button className='btn' onClick={this.handleClick}>
                  LogIn
                </button>
              </div>
            </main>
          </>
        )}
      </>
    );
  }
}
