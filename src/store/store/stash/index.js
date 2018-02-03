import { Record, Map, List, fromJS } from 'immutable';

const Container = Record({
  ready: false,
  content: null,
});

const Collection = Record({
  total: null,
  items: new List(),
});

const EMTPY_COLLECTION = new Collection();
const EMPTY_CONTAINER = new Container();

class State {
  constructor(data = new Map()) {
    this.data = data;
  }

  get(key) {
    return this.data.get(key, EMTPY_COLLECTION);
  }

  set(key, value) {
    return new State(this.data.set(key, value));
  }
}

const ADD_ITEMS = 'r/stash/add-items';
const RESERVE_ITEMS = 'r/stash/reserve-items';
const SET_TOTAL = 'r/stash/set-total';

export function setTotal(key, total) {
  return {
    type: SET_TOTAL,
    key,
    total,
  };
}

export function addItems(key, offset, items) {
  return {
    type: ADD_ITEMS,
    key,
    offset,
    items,
  };
}

export function reserveItems(key, offset, limit) {
  return {
    type: RESERVE_ITEMS,
    key,
    offset,
    limit,
  };
}

function update(state, key, updater) {
  return state.set(key, updater(state.get(key)));
}

export function reducer(state = new State(), action = {}) {
  switch (action.type) {
    case SET_TOTAL:
      return update(state, action.key, stash => stash.set('total', action.total));

    case ADD_ITEMS:
      return update(state, action.key, stash => {
        return stash.set('items', stash.items.withMutations(items => {
          action.items.forEach((item, index) => {
            const position = index + action.offset;
            items.setIn([position, 'content'], fromJS(item));
            items.setIn([position, 'ready'], true);
          });
          return items;
        }));
      });

    case RESERVE_ITEMS:
      return update(state, action.key, stash => {
        return stash.set('items', stash.items.withMutations(items => {
          const start = action.offset;
          const end = start + action.limit;
          for (let position = start; position < end; position++) {
            items.set(position, EMPTY_CONTAINER);
          };
          return items;
        }));
      });

    default:
      return state;
  }
}
