import { Record, List, Map } from 'immutable';

class State extends Record({
  entries: new Map(),
  results: new Map(),
}) {
  getEntry(id) {
    return this.entries.get(id);
  }

  getEntries(namespace) {
    if (!this.results.has(namespace)) {
      return new List();
    }

    return this.results
      .get(namespace)
      .filter(id => this.entries.has(id))
      .map(id => this.entries.get(id));
  }
}

export function createIndex(namespace) {
  const SET_RESULT = `r/${namespace}/object-index/set-result`;
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
    setEntry,
    setEntries,
    deleteEntry,
  };
}
