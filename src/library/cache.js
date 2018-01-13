export class LRUCache {
  constructor(limit = 1000) {
    this.limit = limit;
    this.items = new Map();
  }

  add(key, value) {
    // Delete key if exists to leverage Map's internal order bump.
    if (this.items.has(key)) {
      this.items.delete(key);
    }

    this.items.set(key, value);

    let overflow = this.items.size - this.limit;
    for (const key of this.items.keys()) {
      if (overflow-- < 1) {
        break;
      }
      this.items.delete(key);
    }
  }

  get(key) {
    return this.items.get(key);
  }
}
