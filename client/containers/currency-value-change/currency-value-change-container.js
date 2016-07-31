import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyValueChangeComponent from '../../components/currency-value-change/currency-value-change-component';
import * as CurrencyValueChangeActionCreators from '../../actions/currency-value-change/currency-value-change-actions';
import { getCurrenciesSelector } from '../../selectors/currency-converter-selectors';
import { getCurrencyChangeValuation } from '../../selectors/currency-value-change-selectors';

const MAX_DATE = new Date().toISOString().substring(0, 10);
const MIN_DATE = '2000-01-01';

export default class CurrencyValueChangeContainer extends Component {
  static propTypes = {
    loadHistoricalRates: PropTypes.func,
    currencies: PropTypes.array,
    valuationExchangeCurrency: PropTypes.string,
    valuationBaseCurrency: PropTypes.string,
    changeValuationBaseCurrency: PropTypes.func,
    valuationExchangeCurrencyChanged: PropTypes.func,
    changeStartDate: PropTypes.func,
    changeEndDate: PropTypes.func,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }

  startDateChangeHandler = (date) => {
    this.props.changeStartDate(date, this.props.valuationBaseCurrency, this.props);
  }

  endDateChangeHandler = (date) => {
    this.props.changeEndDate(date, this.props.valuationBaseCurrency, this.props);
  }

  changeValuationBaseCurrency = (currency) => {
    this.props.changeValuationBaseCurrency(currency, this.props.startDate, this.props.endDate, this.props);
  }

  render() {
    return (
      <section>
        <CurrencyValueChangeComponent
          currencies={this.props.currencies}
          maxDate={MAX_DATE}
          minDate={MIN_DATE}
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          currencyChangeValuation={this.props.currencyChangeValuation}
          startDateChangeHandler={this.startDateChangeHandler}
          endDateChangeHandler={this.endDateChangeHandler}
          valuationExchangeCurrency={this.props.valuationExchangeCurrency}
          valuationBaseCurrency={this.props.valuationBaseCurrency}
          baseCurrencyChangeHandler={this.changeValuationBaseCurrency}
          exchangeCurrencyChangeHandler={this.props.valuationExchangeCurrencyChanged}
          />
      </section>
    );
  }
}

export default connect(
  (state) => Object.assign(
    {},
    state.currencyValueChange.toJS(),
    { currencies: getCurrenciesSelector(state) },
    { currencyChangeValuation: getCurrencyChangeValuation(state) }
  ),
  (dispatch) => (Object.assign(
    {},
    bindActionCreators(CurrencyValueChangeActionCreators, dispatch)
  ))
)(CurrencyValueChangeContainer);
