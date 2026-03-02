// Problem Description – Concurrent Cache with Deduplication and TTL
//
// You are required to implement a cache for async data fetching.
//
// The cache must:
// 1. Deduplicate concurrent requests for the same key
// 2. Cache resolved values with a time-to-live (TTL)
// 3. Return cached values if they are still valid
//
// If a cached value is close to expiry, return the current value
// but trigger a background refresh for future requests.

      /**DONE */
class Cache {
  constructor(ttl) {
    this.timeLimit = ttl;
    this.cache = {} // [value, timeStamp, resolves[]]
  }

  get(key, fetcher) {
    
    return new Promise((resolve, reject)=>{
        if(!(key in this.cache)){
          this.cache[key] = [null, null, []]
        }

        if((key in this.cache)  && (new Date() - this.cache[key][1] < this.timeLimit)){
          resolve(cache[key][0])
          return;
        }

        this.cache[key][2].push(resolve)

        if(this.cache[key][2].length == 1){
          Promise.resolve(fetcher()).then((data)=>{
            this.cache[key][2].forEach((resolve)=>{
              this.cache[key][1] = new Date()
              this.cache[key][0] = data
              resolve(data)
            })
          })
        }

    })

  }
}

module.exports = Cache;
