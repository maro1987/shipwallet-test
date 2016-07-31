import createAction from '../../utils/redux/create-action';
import { getLatestExchangeRates } from '../../services/currency-conversion-service';

export const CurrencyConverterActionTypes = {
  EXCHANGE_RATES_LOADED: 'EXCHANGE_RATES_LOADED',
  BASE_CURRENCY_CHANGED: 'BASE_CURRENCY_CHANGED',
  EXCHANGE_CURRENCY_CHANGED: 'EXCHANGE_CURRENCY_CHANGED',
  BASE_VALUE_CHANGED: 'BASE_VALUE_CHANGED'
};

function exchangeRatesLoaded(data) {
  return createAction(CurrencyConverterActionTypes.EXCHANGE_RATES_LOADED, data);
}

export function loadExchangeRates(baseCurrency = '') {
  return getLatestExchangeRates(baseCurrency).then(exchangeRatesLoaded);
}

function baseCurrencyChanged(value) {
  return createAction(CurrencyConverterActionTypes.BASE_CURRENCY_CHANGED, value);
}

export function changeBaseCurrency(value, props) {
  return (dispatch) => {
    const actionsToDispatch = [];
    const currencyData = props[value];

    currencyData ? actionsToDispatch : actionsToDispatch.push(dispatch(loadExchangeRates(value)));

    return Promise.all(actionsToDispatch)
      .then(() => dispatch(baseCurrencyChanged(value)));
  };
}

export function exchangeCurrencyChanged(value) {
  return createAction(CurrencyConverterActionTypes.EXCHANGE_CURRENCY_CHANGED, value);
}

export function baseValueChanged(value) {
  return createAction(CurrencyConverterActionTypes.BASE_VALUE_CHANGED, value);
}
