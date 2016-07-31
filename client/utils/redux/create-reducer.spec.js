import sinon from 'sinon';
import { expect } from 'chai';
import createReducer from './create-reducer';

describe('createReducer', () => {
  const initialState = {
    testAttribute1: 'test',
    testAttribute2: 'test2'
  };

  let reducerMap;
  let testReducer;

  beforeEach(() => {
    reducerMap = {
      TEST_ACTION: sinon.spy()
    };

    testReducer = createReducer(initialState, reducerMap);
  });

  it('should leave state unmodified when action type is unrecognized', () => {
    const state = testReducer(initialState, { type: 'unrecognized_action' });

    expect(reducerMap.TEST_ACTION.called).to.be.false;
    expect(state).to.deep.equal(initialState);
  });

  it('should call the relevant reducer for action type', () => {
    testReducer(initialState, { type: 'TEST_ACTION' });

    expect(reducerMap.TEST_ACTION.called).to.be.true;
  });

  it('should call the relevant reducer for given action type when extended', () => {
    const extendedReducerMap = {
      TEST_ACTION_2: sinon.spy()
    };

    const extendedReducer = createReducer(initialState, extendedReducerMap, testReducer);
    extendedReducer(initialState, { type: 'TEST_ACTION' });
    extendedReducer(initialState, { type: 'TEST_ACTION_2' });

    expect(reducerMap.TEST_ACTION.called).to.be.true;
    expect(extendedReducerMap.TEST_ACTION_2.called).to.be.true;
  });
});
