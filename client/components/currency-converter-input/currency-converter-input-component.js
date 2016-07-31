import React, {Component, PropTypes} from 'react';
import debounce from 'lodash.debounce';
import CurrencySelectorComponent from '../currency-selector/currency-selector-component';

export default class CurrencyConverterInputComponent extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    currencies: PropTypes.array,
    currency: PropTypes.string,
    value: PropTypes.any,
    currencyChangeHandler: PropTypes.func.isRequired,
    inputChangeHandler: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.debouncedSearchSuggestions = debounce(this.props.inputChangeHandler, 500, { leading: true });
    this.refs.valueInput.value = this.props.value;
  }

  componentWillReceiveProps(props) {
    this.refs.valueInput.value = props.value;
  }

  inputChangeHandler = (event) => {
    const { value } = event.target;
    this.debouncedSearchSuggestions(value);
  }

  render() {
    const { currencies, currency, currencyChangeHandler, disabled } = this.props;

    return (
      <div className="currency-converter-input-component">
        <input className="currency-converter-input-component__input"
          onChange={this.inputChangeHandler}
          pattern="[0-9]{10}"
          ref={'valueInput'}
          disabled={disabled}
        />
        <CurrencySelectorComponent
          currencies={currencies}
          selectedCurrency={currency}
          currencyChangeHandler={currencyChangeHandler}
        />
      </div>
    );
  }
}
