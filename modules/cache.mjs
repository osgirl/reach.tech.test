import NodeCache from 'node-cache';
import uuidv4 from 'uuid/v4';

import { getLastValues } from './array';

const DELETE_CHECK_INTERVIAL_SECONDS = 1;

class Cache {
  constructor(ttlSeconds) {
    this.store = new NodeCache({
      checkperiod: DELETE_CHECK_INTERVIAL_SECONDS,
      stdTTL: ttlSeconds,
      useClones: true,
    });
  }

  get(last) {
    const keys = this.store.keys().sort();
    return Object.values(this.store.mget(getLastValues(keys, last)));
  }

  push(value) {
    const now = new Date().valueOf();
    this.store.set(
      `${now}-${uuidv4()}`,
      value,
    );
  }
}

export default Cache;
