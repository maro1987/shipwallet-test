import React, {Component, PropTypes} from 'react';
import CurrencySelectorComponent from '../currency-selector/currency-selector-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker-css';
import moment from 'moment';
import classNames from 'classnames';

export default class CurrencyValueChangeComponent extends Component {
  static propTypes = {
    currencies: PropTypes.array,
    maxDate: PropTypes.string,
    minDate: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    currencyChangeValuation: PropTypes.number,
    startDateChangeHandler: PropTypes.func,
    endDateChangeHandler: PropTypes.func,
    valuationExchangeCurrency: PropTypes.string,
    valuationBaseCurrency: PropTypes.string,
    baseCurrencyChangeHandler: PropTypes.func,
    exchangeCurrencyChangeHandler: PropTypes.func
  }

  componentWillMount() {
    if (!this.props.startDate) {
      this.props.startDateChangeHandler(moment().format('YYYY-MM-DD'));
    }

    if (!this.props.endDate) {
      this.props.endDateChangeHandler(moment().format('YYYY-MM-DD'));
    }
  }

  startDateChangeHandler = (event) => {
    this.props.startDateChangeHandler(event.format('YYYY-MM-DD'));
  }

  endDateChangeHandler = (event) => {
    this.props.endDateChangeHandler(event.format('YYYY-MM-DD'));
  }

  getValuationResultClassNames () {
    const { currencyChangeValuation } = this.props;
    return classNames({
      'currency-value-change-component__valuation-result': true,
      ['--depreciation']: currencyChangeValuation < 0,
      ['--appreciation']: currencyChangeValuation > 0
    });
  }

  render() {
    const { minDate, maxDate, currencies, startDate, endDate, currencyChangeValuation } = this.props;
    return (
      <section className="currency-value-change-component">
      <h1>Currency Change Valuation</h1>
        <div>
          <h4>Dates range</h4>
          <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={startDate ? moment(this.props.startDate) : moment() }
            minDate={moment(minDate) }
            maxDate={moment(this.props.endDate) }
            onChange={this.startDateChangeHandler} />
          <DatePicker
            dateFormat="YYYY-MM-DD"
            selected={endDate ? moment(this.props.endDate) : moment() }
            minDate={moment(this.props.startDate) }
            maxDate={moment(maxDate) }
            onChange={this.endDateChangeHandler} />
        </div>
        <div className="currency-value-change-component__currency-selector">
          <h4>Currency</h4>
          <CurrencySelectorComponent currencies={currencies} selectedCurrency={this.props.valuationExchangeCurrency} currencyChangeHandler={this.props.exchangeCurrencyChangeHandler}/>
          <p className="currency-value-change-component__currency-exchange-paragraph">
            {`<-->`}
          </p>
          <CurrencySelectorComponent currencies={currencies} selectedCurrency={this.props.valuationBaseCurrency} currencyChangeHandler={this.props.baseCurrencyChangeHandler}/>
        </div>
        <p className={this.getValuationResultClassNames()}>
          {currencyChangeValuation > 0 ? `+${currencyChangeValuation}` : currencyChangeValuation}
        </p>
      </section>
    );
  }
}
