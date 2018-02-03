import { Record, Map, List, fromJS } from 'immutable';

const ItemSet = Record({
  total: null,
  items: new List(),
});

const DEFAULT = new ItemSet();

class State {
  constructor(data = new Map()) {
    this.data = data;
  }

  get(key) {
    return this.data.get(key, DEFAULT);
  }

  set(key, value) {
    return new State(this.data.set(key, value));
  }
}

const ADD_ITEMS = 'r/stash/add-items';
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
            items.set(position, fromJS(item));
          });
          return items;
        }));
      });

    default:
      return state;
  }
}
