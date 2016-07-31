import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CurrencyConverterComponent from '../../components/currency-converter/currency-converter-component';
import * as CurrencyConverterActionCreators from '../../actions/currency-converter/currency-converter-actions';
import { getCurrenciesSelector, getExchangeValueSelector } from '../../selectors/currency-converter-selectors';

export default class CurrencyConverterContainer extends Component {
  static propTypes = {
    baseCurrency: PropTypes.string,
    exchangeCurrency: PropTypes.string,
    baseValue: PropTypes.any,
    exchangeValue: PropTypes.number,
    chnageBaseCurrency: PropTypes.func,
    exchangeCurrencyChanged: PropTypes.func,
    baseValueChanged: PropTypes.func,
    exchangeValueChanged: PropTypes.func,
    currencies: PropTypes.array,
    exchangeVal: PropTypes.number
  }

  baseCurrencyChangeHandler = (value) => {
    this.props.changeBaseCurrency(value, this.props);
  }

  exchangeCurrencyChangeHandler = (value) => {
    this.props.exchangeCurrencyChanged(value);
  }

  baseValueChangeHandler = (value) => {
    this.props.baseValueChanged(value);
  }

  exchangeValueChangeHandler = (value) => {
    this.props.exchangeValueChanged(value);
  }

  render() {
    const { currencies } = this.props;
    const { baseCurrency, exchangeCurrency, baseValue, exchangeVal } = this.props;

    return (
      <section>
        <CurrencyConverterComponent
          currencies={currencies}
          baseCurrency={baseCurrency}
          exchangeCurrency={exchangeCurrency}
          baseValue={baseValue}
          exchangeValue={exchangeVal}
          baseCurrencyChangeHandler={this.baseCurrencyChangeHandler}
          exchangeCurrencyChangeHandler={this.exchangeCurrencyChangeHandler}
          baseValueChangeHandler={this.baseValueChangeHandler}
          exchangeValueChangeHandler={this.exchangeValueChangeHandler}
          />
      </section>
    );
  }
}

export default connect(
  (state) => Object.assign(
    {},
    state.currencyConverter.toJS(),
    { currencies: getCurrenciesSelector(state) },
    { exchangeVal: getExchangeValueSelector(state)}
  ),
  (dispatch) => (Object.assign(
    {},
    bindActionCreators(CurrencyConverterActionCreators, dispatch)
  ))
)(CurrencyConverterContainer);
