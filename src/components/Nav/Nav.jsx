import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './Nav.css';

export default () => (
  <nav>
    <ul className={classes.list}>
      <li className={classes.item}>
        <Link to="/home">Home</Link>
      </li>
      <li className={classes.item}>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);
