import 'whatwg-fetch';

const BASE_URL = 'http://api.fixer.io/';

export function getLatestExchangeRates(baseCurrency) {
  const reqUrl = baseCurrency ? `${BASE_URL}latest?base=${baseCurrency}` : `${BASE_URL}latest`;
  return (async() => {
    try {
      const response = await fetch(reqUrl);
      const data = await response.json();
      return data;
    } catch (e) {
      return e;
    }
  })();
}

export function getHistoricalExchangeRates(date, baseCurrency) {
  const reqUrl = baseCurrency ? `${BASE_URL}${date}?base=${baseCurrency}` : `${BASE_URL}${date}`;
  return (async() => {
    try {
      const response = await fetch(reqUrl);
      const data = await response.json();
      return data;
    } catch (e) {
      return e;
    }
  })();
}
