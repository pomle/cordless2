import { LRU } from '../cache.js';

describe('LRU Cache', () => {
  it('stores and retrieves an item', () => {
    const lru = new LRU();
    const item = {};
    lru.add('a', item);
    expect(lru.get('a')).toBe(item);
  });

  it('expells last item on overflow', () => {
    const itemA = {};
    const itemB = {};
    const itemC = {};
    const itemD = {};

    const lru = new LRU(3);
    lru.add('a', itemA);
    lru.add('b', itemB);
    lru.add('c', itemC);
    expect(lru.get('a')).toBe(itemA);
    expect(lru.get('b')).toBe(itemB);
    expect(lru.get('c')).toBe(itemC);
    lru.add('d', itemD);
    expect(lru.get('a')).toBe(undefined);
  });

  it('upgrades touched items on replace', () => {
    const itemA = {};
    const itemB = {};
    const itemC = {};
    const itemD = {};

    const lru = new LRU(3);
    lru.add('a', itemA);
    lru.add('b', itemB);
    lru.add('c', itemC);
    lru.add('a', itemA);
    expect(lru.get('a')).toBe(itemA);
    expect(lru.get('b')).toBe(itemB);
    expect(lru.get('c')).toBe(itemC);
    lru.add('d', itemD);
    expect(lru.get('a')).toBe(itemA);
    expect(lru.get('c')).toBe(itemC);
    expect(lru.get('d')).toBe(itemD);
    expect(lru.get('b')).toBe(undefined);
  });
});
