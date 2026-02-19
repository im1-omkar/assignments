// Problem Description – Async Cache with Time-to-Live (TTL)

// You are required to create an asynchronous cache utility that exposes a get(key, fetcher) method. 
// If the requested key already exists in the cache, the cached value should be returned immediately. 
// If the key does not exist, the fetcher function should be executed to retrieve the value, 
// store it in the cache, and automatically remove the entry after a fixed Time-to-Live (TTL) of 5 seconds.

    /**DONE */

class AsyncCache {
  constructor(ttl = 5000) {
    this.ttl = ttl;
    this.catch = {}
  }

  async get(key, fetcher) {
    if(this.catch[key]){
      return this.catch[key]
    }

    const val = await fetcher()
    this.catch[key] = val;

    this.removeKey(key);
    return val
  }

  removeKey(key){
    setTimeout(()=>{
      delete this.catch[key]
    },this.ttl)
  }
}

module.exports = AsyncCache;
