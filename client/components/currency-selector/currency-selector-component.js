import React, {Component, PropTypes} from 'react';

export default class CurrencyConverterInputComponent extends Component {
  static propTypes = {
    currencies: PropTypes.array,
    selectedCurrency: PropTypes.string,
    currencyChangeHandler: PropTypes.func.isRequired,
  }

  selectorChangeHandler = () => {
    const { currencyChangeHandler } = this.props;
    const { currSelector } = this.refs;
    currencyChangeHandler(currSelector.value);
  }

  render() {
    const { currencies, selectedCurrency } = this.props;
    return (
      <select className="currency-converter-input-component__select" onChange={this.selectorChangeHandler} ref={'currSelector'} defaultValue={selectedCurrency}>
        {
          currencies.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))
        }
      </select>
    );
  }
}
