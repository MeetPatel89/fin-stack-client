import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <>
      <header className='logo'>
        <h1 className='main-heading'>
          <Link to='/'>Fin Stack</Link>
        </h1>
      </header>
    </>
  );
}
