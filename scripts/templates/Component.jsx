import React from 'react';
// import PropTypes from 'prop-types';
import classes from './{{componentName}}.css';

export default class {{componentName}} extends React.PureComponent {
  // static propTypes = {};
  // static defaultProps = {};

  // constructor(props) {
  //   super(props);
  // }

  state = {};

  // componentWillMount() {}
  // componentDidMount() {}
  // shouldComponentUpdate (nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}

  render() {
    return (
      <div className={classes.container}>Component {{componentName}}</div>
    );
  }
}
