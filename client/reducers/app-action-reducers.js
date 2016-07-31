import Immutable from 'immutable';
import createReducer from '../utils/redux/create-reducer';
import { AppActionTypes } from '../actions/app/app-actions';

const initialState = Immutable.fromJS({
  appStarted: false
});

export default createReducer(initialState, {
  [AppActionTypes.APP_STARTED]: (state) => (
    state.set('appStarted', true)
  )
});
