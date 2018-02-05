import React from 'react';
import Nav from 'components/Nav';
import classes from './Main.css';

export default class MainLayout extends React.Component {
  componentDidMount() {
    // execute code on the first load page
  }
  render() {
    return (
      <div className={classes.container}>
        <Nav />
        {this.props.children}
      </div>
    );
  }
}
