import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes/routes';
import { initializeApp } from '../actions/app/app-actions';
import { saveAppState, getAppState } from '../services/local-storage-service';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { store } = this.props;
    store.subscribe(()=>{
      saveAppState(store.getState());
    });

    store.dispatch(initializeApp(store));
  }

  render() {
    return (
      <div>
        <Provider store={this.props.store}>
          <Router history={this.props.history}>
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}
