import { Record, List, Map, OrderedSet } from 'immutable';

class State extends Record({
  entries: new Map(),
  results: new Map(),
}) {
  getEntry(id) {
    return this.entries.get(id);
  }

  getResult(namespace) {
    if (!this.results.has(namespace)) {
      return new List();
    }

    return this.results.get(namespace);
  }

  getEntries(namespace) {
    return this.getResult(namespace)
      .filter(id => this.entries.has(id))
      .map(id => this.entries.get(id));
  }
}

export function createIndex(namespace) {
  const SET_RESULT = `r/${namespace}/object-index/set-result`;
  const UPDATE_RESULT = `r/${namespace}/object-index/update-result`;
  const SET_ENTRIES = `r/${namespace}/object-index/set-entries`;
  const DELETE_ENTRY = `r/${namespace}/object-index/delete-entry`;

  function setEntry(id, object) {
    return setEntries([{ id, object }]);
  }

  function setEntries(entries) {
    return {
      type: SET_ENTRIES,
      entries,
    };
  }

  function setResult(namespace, result) {
    return {
      type: SET_RESULT,
      namespace,
      result,
    };
  }

  function updateResult(namespace, result) {
    return {
      type: UPDATE_RESULT,
      namespace,
      result,
    };
  }

  function deleteEntry(id) {
    return {
      type: DELETE_ENTRY,
      id,
    };
  }

  function reducer(state = new State(), action = {}) {
    switch (action.type) {
      case SET_RESULT:
        return state.set(
          'results',
          state.results.set(action.namespace, action.result)
        );
      case UPDATE_RESULT:
        return state.set(
          'results',
          state.results.mergeDeep({[action.namespace]: action.result})
        );
      case SET_ENTRIES:
        return state.set(
          'entries',
          state.entries.withMutations(entries => {
            for (const entry of action.entries) {
              entries.set(entry.id, entry.object);
            }
            return entries;
          })
        );
      case DELETE_ENTRY:
        return state.set('entries', state.entries.delete(action.id));
      default:
        return state;
    }
  }

  return {
    reducer,
    setResult,
    updateResult,
    setEntry,
    setEntries,
    deleteEntry,
  };
}

function ts() {
  return new Date().getTime();
}

export function createFetcher(callback, {refresh = 10000, interval = 500}) {

  let refreshAfter = 0;

  return function fetch(...args) {
    const now = ts();

    return async (dispatch, getState) => {
      if (now < refreshAfter) {
        return;
      }

      refreshAfter = now + refresh;

      const handler = callback(...args);

      function finish() {
        clearInterval(timer);
        flush();
        dispatch(handler.onFinish(results));
      }

      function flush() {
        const entries = items.map(item => {
          return {
            id: item.id,
            object: item,
          };
        });

        results = results.concat(items.map(item => item.id));

        dispatch(handler.onEntries(entries));
        dispatch(handler.onResult(results));

        items = items.clear();
      }

      const timer = setInterval(flush, interval);

      let items = new List();
      let results = new OrderedSet();

      flush();

      const consumer = handler.request(getState());

      consumer.onData(data => items = items.concat(data.items));

      consumer.onDone(finish);
    };
  }
}
