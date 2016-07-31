import createAction from '../../utils/redux/create-action';
import { getHistoricalExchangeRates } from '../../services/currency-conversion-service';
import { adaptHistoricalRates } from '../../adapters/historical-rates-adapter';

export const CurrencyValuationActionTypes = {
  HISTORICAL_RATES_LOADED: 'HISTORICAL_RATES_LOADED',
  START_DATE_CHANGED: 'START_DATE_CHANGE',
  END_DATE_CHANGED: 'END_DATE_CHANGED',
  VALUATION_BASE_CURRENCY_CHANGED: 'VALUATION_BASE_CURRENCY_CHANGED',
  VALUATION_EXCHANGE_CURRENCY_CHANGED: 'VALUATION_EXCHANGE_CURRENCY_CHANGED',
};

function historicalRatesLoaded(data, requestedDate) {
  return createAction(CurrencyValuationActionTypes.HISTORICAL_RATES_LOADED, adaptHistoricalRates(data, requestedDate));
}

export function loadHistoricalRates(date, baseCurrency = '') {
  return getHistoricalExchangeRates(date, baseCurrency).then((data) => historicalRatesLoaded(data, date));
}

function startDateChanged(date) {
  return createAction(CurrencyValuationActionTypes.START_DATE_CHANGED, date);
}

function endDateChanged(date) {
  return createAction(CurrencyValuationActionTypes.END_DATE_CHANGED, date);
}

export function valuationBaseCurrencyChanged(currency) {
  return createAction(CurrencyValuationActionTypes.VALUATION_BASE_CURRENCY_CHANGED, currency);
}

export function valuationExchangeCurrencyChanged(currency) {
  return createAction(CurrencyValuationActionTypes.VALUATION_EXCHANGE_CURRENCY_CHANGED, currency);
}

function changeDate(date, baseCurrency, props, successAction) {
  return (dispatch) => {
    const currencyHistoryData = props[baseCurrency];
    const actionsToDispatch = [];
    if (currencyHistoryData) {
      currencyHistoryData[date] ? actionsToDispatch : actionsToDispatch.push(dispatch(loadHistoricalRates(date, baseCurrency)));
    } else {
      actionsToDispatch.push(dispatch(loadHistoricalRates(date, baseCurrency)));
    }

    return Promise.all(actionsToDispatch)
      .then(() => dispatch(successAction(date)));
  };
}

export function changeValuationBaseCurrency(baseCurrency, startDate, endDate, props) {
  return (dispatch) => {
    const currencyHistoryData = props[baseCurrency];
    const actionsToDispatch = [];
    console.log(currencyHistoryData);
    if (!currencyHistoryData) {
      actionsToDispatch.push(dispatch(loadHistoricalRates(startDate, baseCurrency)));
      actionsToDispatch.push(dispatch(loadHistoricalRates(endDate, baseCurrency)));
    } else {
      if (!currencyHistoryData[startDate]) {
        actionsToDispatch.push(dispatch(loadHistoricalRates(startDate, baseCurrency)));
      }

      if (!currencyHistoryData[endDate]) {
        actionsToDispatch.push(dispatch(loadHistoricalRates(endDate, baseCurrency)));
      }
    }
    console.log(actionsToDispatch);
    return Promise.all(actionsToDispatch)
      .then(() => dispatch(valuationBaseCurrencyChanged(baseCurrency)));
  };
}

export function changeStartDate(date, baseCurrency, props) {
  return changeDate(date, baseCurrency, props, startDateChanged);
}

export function changeEndDate(date, baseCurrency, props) {
  return changeDate(date, baseCurrency, props, endDateChanged);
}

