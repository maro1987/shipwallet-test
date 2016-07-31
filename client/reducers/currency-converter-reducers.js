import Immutable from 'immutable';
import createReducer from '../utils/redux/create-reducer';
import { CurrencyConverterActionTypes } from '../actions/currency-converter/currency-converter-actions';
import { AppActionTypes } from '../actions/app/app-actions';

const initialState = Immutable.fromJS({
  baseCurrency: 'PLN',
  exchangeCurrency: 'GBP',
  baseValue: 100
});

export default createReducer(initialState, {
  [AppActionTypes.APP_STATE_LOADED]: (state, loadedState) => {
    return Immutable.fromJS(loadedState.currencyConverter);
  },
  [CurrencyConverterActionTypes.EXCHANGE_RATES_LOADED]: (state, data) => {
    return state.set(data.base, data);
  },
  [CurrencyConverterActionTypes.BASE_CURRENCY_CHANGED]: (state, value) => (
    state.set('baseCurrency', value)
  ),
  [CurrencyConverterActionTypes.EXCHANGE_CURRENCY_CHANGED]: (state, value) => (
    state.set('exchangeCurrency', value)
  ),
  [CurrencyConverterActionTypes.BASE_VALUE_CHANGED]: (state, value) => (
    state.set('baseValue', value)
  )
});
