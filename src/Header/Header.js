import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header(props) {
  return (
    <>
      <header className='logo'>
        <h1 className='main-heading'>
          <Link to='/'>Fin Stack</Link>
        </h1>
        <span className='user'>{props.user && `Welcome ${props.user}!`}</span>
      </header>
    </>
  );
}
