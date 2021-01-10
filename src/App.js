import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import SignUp from './SignUp/SignUp';

export default class App extends Component {
  render() {
    return (
      <>
        <h1>Hello Fin Stack</h1>
        <Link to='/register'>
          <button>SignUp</button>
        </Link>

        <br />
        <br />
        <Link to='/login'>
          <button>LogIn</button>
        </Link>

        <Route path='/register' component={SignUp}/>

      </>
    );
  }
}
