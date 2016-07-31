import Immutable from 'immutable';
import createReducer from '../utils/redux/create-reducer';
import { CurrencyValuationActionTypes } from '../actions/currency-value-change/currency-value-change-actions';
import { AppActionTypes } from '../actions/app/app-actions';

const initialState = Immutable.fromJS({
  startDate: '',
  endDate: '',
  valuationBaseCurrency: 'SEK',
  valuationExchangeCurrency: 'PLN'
});

export default createReducer(initialState, {
  [AppActionTypes.APP_STATE_LOADED]: (state, loadedState) => {
    return Immutable.fromJS(loadedState.currencyValueChange);
  },
  [CurrencyValuationActionTypes.HISTORICAL_RATES_LOADED]: (state, data) => (
    state.setIn([data.base, data.date], data.rates)
  ),
  [CurrencyValuationActionTypes.START_DATE_CHANGED]: (state, date) => (
    state.set('startDate', date)
  ),
  [CurrencyValuationActionTypes.END_DATE_CHANGED]: (state, date) => (
    state.set('endDate', date)
  ),
  [CurrencyValuationActionTypes.VALUATION_BASE_CURRENCY_CHANGED]: (state, currency) => (
    state.set('valuationBaseCurrency', currency)
  ),
  [CurrencyValuationActionTypes.VALUATION_EXCHANGE_CURRENCY_CHANGED]: (state, currency) => (
    state.set('valuationExchangeCurrency', currency)
  )
});
