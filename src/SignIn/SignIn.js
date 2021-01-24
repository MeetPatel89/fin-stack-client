import React, { Component } from 'react';
import config from '../config';
import HomePage from '../HomePage/HomePage';
import Header from '../Header/Header';
import './SignIn.css';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      username: '',
      password: '',
    };
  }

  handleClick = (e) => {
    this.setState({
      isLogged: false,
      username: '',
      password: '',
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    fetch(`${config.API_BASE_URL}/users/${username}`)
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          this.setState({
            usernameError: 'Please enter the correct username',
            passwordError: '',
          });
          return;
        }
        return response.json();
      })
      .then((user) => {
        if (!user.length) {
          this.setState({
            usernameError: 'Please enter the correct username',
            passwordError: '',
          });
        } else if (user[0].password !== password) {
          this.setState({
            passwordError: 'Please enter the correct password',
            usernameError: '',
          });
        } else {
          this.setState({
            isLogged: true,
            ...user[0],
          });
        }
      })
      .catch((err) => {
        this.setState({
          usernameError: 'Please enter the correct username',
          passwordError: '',
        });
      });
  };

  render() {
    return (
      <>
        {this.state.isLogged ? (
          <HomePage
            user={this.state.username}
            handleClick={this.handleClick}
            userId={this.state.id}
          />
        ) : (
          <>
            <Header />
            <main className='container'>
              <section className='form-container sign-in-container'>
                <h2>PLEASE SIGN IN</h2>
                <form
                  className='form sign-in-form'
                  onSubmit={this.handleSubmit}
                >
                  <div className='label-control'>
                    <input
                      className='input'
                      type='text'
                      name='username'
                      id='username'
                      aria-label='Username for the account'
                      aria-required='true'
                      aria-describedby='usernameError'
                      aria-invalid='true'
                      value={this.state.username}
                      onChange={this.handleChange}
                      autoComplete='off'
                      required
                    />
                    <label className='label' htmlFor='username'>
                      <span className='content'>Username</span>
                    </label>
                    <div className='errorMessage' id='usernameError'>
                      {this.state.usernameError}
                    </div>
                  </div>

                  <div className='label-control'>
                    <input
                      className='input'
                      type='password'
                      name='password'
                      id='password'
                      aria-label='Password for the account'
                      aria-required='true'
                      aria-describedby='passwordError'
                      aria-invalid='true'
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                    <label className='label' htmlFor='password'>
                      <span className='content'>Password</span>{' '}
                    </label>
                    <div className='errorMessage' id='passwordError'>
                      {this.state.passwordError}
                    </div>
                  </div>
                  <div id='btns' className='buttons'>
                    <button className='btn log-in-button' type='submit'>
                      LogIn
                    </button>
                    <p className='to-signup'>Don't have an account</p>
                    <button
                      className='btn sign-up-button'
                      type='button'
                      onClick={this.props.handleClick}
                    >
                      SignUp
                    </button>
                  </div>
                </form>
              </section>
            </main>
            <footer>
              <p>&#169;Meet 2021</p>
            </footer>
          </>
        )}
      </>
    );
  }
}
