import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import app from './app-action-reducers';
import currencyConverter from './currency-converter-reducers';
import currencyValueChange from './currency-value-change-reducers';

const reducers = combineReducers({
  app,
  currencyConverter,
  currencyValueChange,
  routing: routerReducer
});

export default reducers;
