import { OrderedSet } from 'immutable';
import { createIndex, createFetcher } from 'library/store/object-index';

const { reducer, updateResult, mergeEntries, setResult } = createIndex('search-tracks');

export const searchTracks = createFetcher(query => {
  let list = new OrderedSet();

  return {
    request: state => {
      const api = state.session.searchAPI;
      return api.consumer(api.search('track', query));
    },

    onFlush: results => {
      const ids = [...results.map(result => result.tracks.items.map(t => t.id))];
      list = list.concat(...ids);
      return results.map(addSearchResult).push(updateResult(query, list));
    },

    onFinish: () => setResult(query, list)
  };
});

export function addSearchResult(payload) {
  const entries = {};
  for (const track of payload.tracks.items) {
      entries[track.id] = track;
  }
  return mergeEntries(entries);
}

export { reducer };
