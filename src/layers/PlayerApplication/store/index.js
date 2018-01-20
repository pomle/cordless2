import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';

function createIteratorMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (action[Symbol.iterator]) {
        return action.forEach(dispatch);
    }

    return next(action);
  };
}

function createThunkMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}

export function createStore() {
  const thunk = createThunkMiddleware();
  const iterator = createIteratorMiddleware();
  return createReduxStore(reducer, applyMiddleware(thunk, iterator));
}
