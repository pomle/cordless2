import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';

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
  return createReduxStore(reducer, applyMiddleware(thunk));
}
