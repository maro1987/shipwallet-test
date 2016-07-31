import { createSelector } from 'reselect';

const dataSelector = (state) => state.currencyConverter;
const baseCurrencySelector = (state) => state.currencyConverter.get('baseCurrency');
const baseValueSelector = (state) => state.currencyConverter.get('baseValue');
const exchangeCurrencySelector = (state) => state.currencyConverter.get('exchangeCurrency');

export const getCurrenciesSelector = createSelector(
  dataSelector,
  baseCurrencySelector,
  (data, baseCurrency) => {
    let currencyData = data.get(baseCurrency);
    if (typeof currencyData.toJS === 'function') {
      currencyData = currencyData.toJS();
    }
    const currencies = Object.keys(currencyData.rates);
    currencies.unshift(baseCurrency);
    return currencies.sort();
  }
);

const getExchangeRateSelector = createSelector(
  dataSelector,
  exchangeCurrencySelector,
  baseCurrencySelector,
  (data, exchangeCurrency, baseCurrency) => {
    let currencyData = data.get(baseCurrency);
    if (typeof currencyData.toJS === 'function') {
      currencyData = currencyData.toJS();
    }
    return currencyData.rates[exchangeCurrency];
  }
);

export const getExchangeValueSelector = createSelector(
  getExchangeRateSelector,
  baseValueSelector,
  (exchangeRate, baseValue) => {
    const rate = exchangeRate ? exchangeRate : 1;
    return Math.round((rate * baseValue) * 100) / 100;
  }
);
