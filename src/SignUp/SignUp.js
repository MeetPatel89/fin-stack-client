import React, { Component } from 'react';
import config from '../config';
import Header from '../Header/Header';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      password: '',
      'confirm-password': '',
      usernameError: '',
      fullnameError: '',
      passwordError: '',
      confirmPasswordError: '',
      usernameExists: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // validation variable for password
    const passwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (this.state.fullname.length > 36) {
      this.setState({
        fullnameError: 'Full name should be less than 36 characters',
        signUp: '',
        usernameError: '',
        passwordError: '',
        confirmPasswordError: '',
        usernameExists: '',
      });
    } else if (this.state.username.length > 36) {
      this.setState({
        usernameError: 'Username should be less than 36 characters',
        signUp: '',
        fullnameError: '',
        passwordError: '',
        confirmPasswordError: '',
        usernameExists: '',
      });
    } else if (!this.state.password.match(passwd)) {
      this.setState({
        passwordError:
          'Password should contain at least one uppercase letter, one lowercase letter and one numeric digit',
        signUp: '',
        confirmPasswordError: '',
        fullnameError: '',
        usernameError: '',
        usernameExists: '',
      });
    } else if (this.state.password !== this.state['confirm-password']) {
      this.setState({
        confirmPasswordError:
          '"Password" and "Confirm Password" fields should match each other',
        signUp: '',
        fullnameError: '',
        usernameError: '',
        passwordError: '',
        usernameExists: '',
      });
    } else {
      const { fullname, username, password } = this.state;
      const newUser = {
        fullname,
        username,
        password,
      };

      fetch(`${config.API_BASE_URL}/users`)
        .then((response) => response.json())
        .then((users) => {
          const username = users.find(
            (user) => user.username === newUser.username
          );
          if (username) {
            this.setState({
              confirmPasswordError: '',
              signUp: '',
              fullnameError: '',
              usernameError: '',
              passwordError: '',
              usernameExists:
                'This username is already taken. Please enter a different one',
            });
          } else {
            fetch(`${config.API_BASE_URL}/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            })
              .then((user) => user.json())
              .then(() => {
                this.setState({
                  signUp:
                    'You can now log in using newly created user credentials',
                  fullnameError: '',
                  usernameError: '',
                  passwordError: '',
                  confirmPasswordError: '',
                  fullname: '',
                  username: '',
                  password: '',
                  'confirm-password': '',
                  usernameExists: '',
                });
              })
              .catch((error) => {
                this.setState({
                  error: error.message,
                });
              });
          }
        });
    }
  };

  render() {
    return (
      <>
        <Header />
        <main className='main-container'>
          <section className='form-container sign-up-container'>
            <h2>CREATE ACCOUNT</h2>
            <form className='form sign-up-form' onSubmit={this.handleSubmit}>
              <div className='label-control'>
                <input
                  className='input'
                  type='text'
                  name='fullname'
                  id='fullname'
                  aria-label='fullname'
                  aria-required='true'
                  aria-describedby='fullnameError'
                  aria-invalid='true'
                  value={this.state.fullname}
                  onChange={this.handleChange}
                  autoComplete='off'
                  required
                />
                <label className='label' htmlFor='fullname'>
                  <span className='content'>Fullname</span>
                </label>
                <div className='errorMessage' id='fullnameError'>
                  {this.state.fullnameError}
                </div>
              </div>
              <div className='label-control'>
                <input
                  className='input'
                  type='text'
                  name='username'
                  id='username'
                  aria-label='username'
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
                <div className='errorMessage'>{this.state.usernameExists}</div>
              </div>
              <div className='label-control'>
                <input
                  className='input'
                  type='password'
                  name='password'
                  id='password'
                  aria-label='password'
                  aria-required='true'
                  aria-describedby='passwordError'
                  aria-invalid='true'
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
                <label className='label' htmlFor='password'>
                  <span className='content'>Password</span>
                </label>
                <div className='errorMessage' id='passwordError'>
                  {this.state.passwordError}
                </div>
              </div>
              <div className='label-control'>
                <input
                  className='input'
                  type='password'
                  name='confirm-password'
                  id='confirm-password'
                  aria-label='confirm-password'
                  aria-required='true'
                  aria-describedby='confirmPasswordError'
                  aria-invalid='true'
                  value={this.state['confirm-password']}
                  onChange={this.handleChange}
                  required
                />
                <label className='label' htmlFor='confirm-password'>
                  <span className='content'>Confirm Password</span>
                </label>
                <div className='errorMessage' id='confirmPasswordError'>
                  {this.state.confirmPasswordError}
                </div>
              </div>
              <div className='buttons' id='btns'>
                <button className='btn' type='submit'>
                  Sign Up
                </button>
                <p className='to-signin'>Already have an account?</p>
                <button
                  className='btn'
                  type='button'
                  onClick={this.props.handleClick}
                >
                  LogIn
                </button>
              </div>
              <div className='fetchErrorMessage'>{this.state.error}</div>
              <div className='sign-up successMessage'>{this.state.signUp}</div>
            </form>
          </section>
        </main>
        <footer>
          <p>&#169;Meet 2021</p>
        </footer>
      </>
    );
  }
}
