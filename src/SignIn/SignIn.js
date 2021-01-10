import React, { Component } from 'react';
import config from '../config';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            username: '',
            password: ''
        }
    }

    render() {
        return (
          <>
            <main className='container'>
              <section className='form-container sign-in-container'>
                <h2>PLEASE SIGN IN</h2>
                <form className='sign-in-form' onSubmit={this.handleSubmit}>
                  <div className='label-control'>
                    <label htmlFor='username'>Username</label>
                    <input
                      type='text'
                      name='username'
                      id='username'
                      aria-label='Username for the account'
                      aria-required='true'
                      aria-describedby='usernameError'
                      aria-invalid='true'
                      value={this.state.username}
                      onChange={this.handleChange}
                      required
                    />
                    <div className='errorMessage' id='usernameError'>
                      {this.state.usernameError}
                    </div>
                  </div>

                  <div className='label-control'>
                    <label htmlFor='password'> Password</label>
                    <input
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
                    <div className='errorMessage' id='passwordError'>
                      {this.state.passwordError}
                    </div>
                  </div>

                  <button type='submit' className='log-in-button'>
                    LogIn
                  </button>
                  <p>Don't have an account</p>
                  <button
                    type='button'
                    className='sign-up-button'
                  >
                    Sign up
                  </button>
                </form>
              </section>
            </main>
          </>
        );
    }
}