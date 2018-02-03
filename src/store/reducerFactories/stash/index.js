import {fromJS} from 'immutable';
import {StashState, EMPTY_CONTAINER} from './model';

function update(state, key, updater) {
  return state.set(key, updater(state.get(key)));
}

export function createStash(name) {
  const ADD_ITEMS = Symbol(`r/stash/${name}/add-items`);
  const RESERVE_ITEMS = Symbol(`r/stash/${name}/reserve-items`);
  const SET_TOTAL = Symbol(`r/stash/${name}/set-total`);

  function setTotal(key, total) {
    return {
      type: SET_TOTAL,
      key,
      total,
    };
  }

  function addItems(key, offset, items) {
    return {
      type: ADD_ITEMS,
      key,
      offset,
      items,
    };
  }

  function reserveItems(key, offset, limit) {
    return {
      type: RESERVE_ITEMS,
      key,
      offset,
      limit,
    };
  }

  function reducer(state = new StashState(), action = {}) {
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

  return {
    reducer,
    reserveItems,
    addItems,
    setTotal,
  };
}
