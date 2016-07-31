import React, { Component, PropTypes } from 'react';
import CurrencyConverterContainer from '../../containers/currency-converter/currency-converter-container';
import CurrencyValueChangeContainer from '../../containers/currency-value-change/currency-value-change-container';

export default class HomeView extends Component {
  static propTypes = {

  };

  componentWillMount() {

  }

  render() {
    return (
      <main className="home-view">
        <CurrencyConverterContainer/>
        <CurrencyValueChangeContainer/>
      </main>
    );
  }
}
