import { createSelector } from 'reselect';

const currencyValueChangeDataSelector = (state) => state.currencyValueChange;
const valuationBaseCurrSelector = (state) => state.currencyValueChange.get('valuationBaseCurrency');
const valuationExchangeCurrSelector = (state) => state.currencyValueChange.get('valuationExchangeCurrency');
const valuationStartDateSelector = (state) => state.currencyValueChange.get('startDate');
const valuationEndDateSelector = (state) => state.currencyValueChange.get('endDate');

export const getCurrencyChangeValuation = createSelector(
  currencyValueChangeDataSelector,
  valuationBaseCurrSelector,
  valuationExchangeCurrSelector,
  valuationStartDateSelector,
  valuationEndDateSelector,
  (data, baseCurr, exchangeCurr, startDate, endDate) => {
    if (baseCurr === exchangeCurr) {
      return 0;
    }

    if (data.get(baseCurr)) {
      let startRates = data.get(baseCurr).get(startDate);
      let endRates = data.get(baseCurr).get(endDate);

      if (startRates && endRates) {
        if (typeof startRates.toJS === 'function') {
          startRates = startRates.toJS();
        }
        if (typeof endRates.toJS === 'function') {
          endRates = endRates.toJS();
        }
        return Math.round((endRates[exchangeCurr] - startRates[exchangeCurr]) * 1000000) / 1000000;
      }
    }
    return 0;
  }
);
