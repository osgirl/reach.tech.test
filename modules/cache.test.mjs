import Cache from './cache';

describe('cache class', () => {
  it('sets the internal store\'s TTL for values to be the value provided in the constructor', () => {
    const ttl = 120;
    const cache = new Cache(ttl);

    expect(cache.store.options.stdTTL).toBe(ttl);
  });

  describe('get', () => {
    it('returns the last X values in the cache', () => {
      const last = 5;
      const cache = new Cache(60);

      [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
      ].forEach(
        (value, index) => cache.store.set(index, value),
      );

      const result = cache.get(last);
      expect(result).toHaveLength(last);
      expect(result).toEqual([
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
      ]);
    });
  });

  describe('push', () => {
    it('saves all the values provided to the cache\'s store', () => {
      const uuidV4Pattern = '[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}';
      const storeKeyPattern = new RegExp(`^(?:\\d+)-(?:${uuidV4Pattern})$`, 'i');

      const values = ['VALUE_1', 'VALUE_2', 'VALUE_1', 'VALUE_3'];
      const cache = new Cache(60);

      values.forEach(value => cache.push(value));

      const cacheData = cache.store.mget(cache.store.keys());
      const entries = Object.entries(cacheData);

      expect(entries).toHaveLength(values.length);

      values.forEach((inputValue, index) => {
        const [key, entryValue] = entries[index];
        expect(key).toEqual(expect.stringMatching(storeKeyPattern));
        expect(entryValue).toBe(inputValue);
      });
    });
  });
});
