import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

Header.propTypes = {
  user: PropTypes.string,
};

Header.defaultProps = {
  user: 'RandomUser89',
};
