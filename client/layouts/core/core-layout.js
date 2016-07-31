import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.object,
    appStarted: PropTypes.bool
  };

  render() {
    const { appStarted, children } = this.props;
    return (
      <div>
        {appStarted && children}
      </div>
    );
  }
}

export default connect(
  (state) => state.app.toJS()
)(CoreLayout);
