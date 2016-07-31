export function adaptHistoricalRates(data, requestedDate) {
  return Object.assign({}, data, { date: requestedDate });
}
