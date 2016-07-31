import createAction from '../../utils/redux/create-action';
import { loadExchangeRates } from '../currency-converter/currency-converter-actions';
import { getAppState } from '../../services/local-storage-service';

export const AppActionTypes = {
  APP_STATE_LOADED: 'APP_STATE_LOADED',
  APP_STARTED: 'APP_STARTED'
};

function appStarted() {
  return createAction(AppActionTypes.APP_STARTED);
}

function appStateLoaded(state) {
  return createAction(AppActionTypes.APP_STATE_LOADED, state);
}

export function initializeApp(store) {
  return (dispatch) => {
    const persistentState = getAppState();
    if (persistentState) {
      dispatch(appStateLoaded(persistentState));
    }

    return Promise.all([
      dispatch(loadExchangeRates(store.getState().currencyConverter.get('baseCurrency')))
    ]).then(() => dispatch(appStarted()));
  };
}
