import React, {Component, PropTypes} from 'react';
import CurrencyConverterInputComponent from '../currency-converter-input/currency-converter-input-component';

export default class CurrencyConverterComponent extends Component {
  static propTypes = {
    currencies: PropTypes.array,
    baseCurrency: PropTypes.string,
    exchangeCurrency: PropTypes.string,
    baseValue: PropTypes.any,
    baseCurrencyChangeHandler: PropTypes.func.isRequired,
    exchangeCurrencyChangeHandler: PropTypes.func.isRequired,
    baseValueChangeHandler: PropTypes.func.isRequired
  }

  baseCurrencyChangeHandler = (value) => {
    const { baseCurrencyChangeHandler } = this.props;
    baseCurrencyChangeHandler(value);
  }

  exchangeCurrencyChangeHandler = (value) => {
    const { exchangeCurrencyChangeHandler } = this.props;
    exchangeCurrencyChangeHandler(value);
  }

  baseValueChangeHandler = (value) => {
    const { baseValueChangeHandler } = this.props;
    baseValueChangeHandler(value);
  }

  render() {
    const { currencies, baseCurrency, exchangeCurrency, baseValue, exchangeValue } = this.props;

    return (
      <section className="currency-converter-component">
        <h1>Currency Converter</h1>
        <CurrencyConverterInputComponent
          currencies={currencies}
          currency={baseCurrency}
          value={baseValue}
          currencyChangeHandler={this.baseCurrencyChangeHandler}
          inputChangeHandler={this.baseValueChangeHandler}
          />
        <CurrencyConverterInputComponent
          currencies={currencies}
          value={exchangeValue}
          currency={exchangeCurrency}
          currencyChangeHandler={this.exchangeCurrencyChangeHandler}
          inputChangeHandler={()=>{}}
          disabled={true}
          />
      </section>
    );
  }
}
