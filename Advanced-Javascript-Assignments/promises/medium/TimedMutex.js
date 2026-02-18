// Problem Description – Async Mutex with Timeout
//
// You need to acquire a lock before running an async task.
// If the lock cannot be acquired within a given time limit,
// the operation should fail.
//
// This problem tests concurrency control and timeout handling.
//

 class TimedMutex {
  constructor() {
    this.locked = false;
    this.queue = [];
  }

  acquire(timeout) {
    return new Promise((resolve, reject) => {
      
      if (!this.locked) {
        this.locked = true;
        resolve(this._createRelease());
        return;
      }

      
      const request = {};

      request.resolve = resolve;
      request.reject = reject;

     
      request.timeoutId = setTimeout(() => {
        
        const index = this.queue.indexOf(request);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
        reject("Lock Timeout");
      }, timeout);

      this.queue.push(request);
    });
  }

  _createRelease() {
    return () => {
      if (this.queue.length > 0) {
        const next = this.queue.shift();

        
        clearTimeout(next.timeoutId);

        
        next.resolve(this._createRelease());
      } else {
        this.locked = false;
      }
    };
  }
}

module.exports = TimedMutex;
