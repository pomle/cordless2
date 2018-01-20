import { Record, List, Map, Seq } from 'immutable';

class NormalizedState extends Record({
  entries: new Map(),
  results: new Map(),
}) {
  getEntry(id) {
    return this.entries.get(id);
  }

  getResult(namespace) {
    if (!this.results.has(namespace)) {
      return new Seq();
    }

    return this.results.get(namespace);
  }

  getEntries(namespace) {
    return this.getResult(namespace)
      .filter(id => this.entries.has(id))
      .map(id => this.entries.get(id));
  }
}

function preferNew(a, b) {
  return a || b;
}

export function createIndex(namespace) {
  const SET_RESULT = `r/${namespace}/object-index/set-result`;
  const UPDATE_RESULT = `r/${namespace}/object-index/update-result`;
  const SET_ENTRIES = `r/${namespace}/object-index/set-entries`;
  const MERGE_ENTRIES = `r/${namespace}/object-index/merge-entries`;
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

  function mergeEntry(id, object) {
    return mergeEntries({[id]: object});
  }

  function mergeEntries(entries) {
    return {
      type: MERGE_ENTRIES,
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

  function reducer(state = new NormalizedState(), action = {}) {
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

      case MERGE_ENTRIES:
        return state.setIn(['entries'], state.entries.mergeDeepWith(preferNew, action.entries));

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
    mergeEntry,
    mergeEntries,
    setEntry,
    setEntries,
    deleteEntry,
  };
}

export function createFetcher(callback, {interval = 500}) {
  return function fetch(...args) {
    const all = [];
    let results = new List();

    return async (dispatch, getState) => {
      const {request, onFlush, onFinish} = callback(...args);

      function finish() {
        clearInterval(timer);
        flush();
        dispatch(onFinish(new List(all)));
      }

      function flush() {
        dispatch(onFlush(results));
        results = results.clear();
      }

      const timer = setInterval(flush, interval);

      const consumer = request(getState());

      consumer.onData(data => {
        all.push(data);
        results = results.push(data);
      });

      consumer.onDone(finish);
    };
  }
}
