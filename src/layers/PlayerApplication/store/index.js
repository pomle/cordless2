import {createStore as createReduxStore} from 'redux';
import {reducer} from './reducer';

export function createStore() {
    return createReduxStore(reducer)
}
