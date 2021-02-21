import { Record, Map, List } from 'immutable';

const Container = Record({
  ready: false,
  content: null,
});

const Collection = Record({
  total: null,
  items: new List(),
});

export const EMPTY_COLLECTION = new Collection();
export const EMPTY_CONTAINER = new Container();

export class StashState {
  constructor(data = new Map()) {
    this.data = data;
  }

  get(key) {
    return this.data.get(key, EMPTY_COLLECTION);
  }

  set(key, value) {
    return new StashState(this.data.set(key, value));
  }
}
