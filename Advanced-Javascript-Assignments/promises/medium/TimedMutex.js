// Problem Description – Async Mutex with Timeout
//
// You need to acquire a lock before running an async task.
// If the lock cannot be acquired within a given time limit,
// the operation should fail.
//
// This problem tests concurrency control and timeout handling.
//

        /**Not done yet */

class TimedMutex {
  constructor() {
    this.locked = false;
    this.queue = [];

  }

  acquire(timeoutMs) {
      if(this.locked == true){
        this.queue.push(timeoutMs)
      }

      return ()=>{
        this.locked = false;
      }
  }
}

module.exports = TimedMutex;
