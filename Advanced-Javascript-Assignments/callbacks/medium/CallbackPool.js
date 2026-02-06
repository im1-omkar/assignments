// Problem Description – Asynchronous Worker Pool

// You are required to create a worker pool that manages the execution of asynchronous tasks. 
// The pool should ensure that no more than N tasks are running concurrently, while any additional tasks are queued. 
// As tasks complete, queued tasks should start automatically.
// Each task must resolve with its own result.

  /**DONE */

class CallbackPool {
  
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.running = 0;
  }

  run(task, onComplete) {
    
    this.queue.push({ task, onComplete });
    this._next();
  }

  _next() {
    
    if (this.running >= this.limit) return;
    if (this.queue.length === 0) return;

    const { task, onComplete } = this.queue.shift();
    this.running++;

    task((err, result) => {
      this.running--;
      onComplete(err, result);
      this._next(); 
    });
  }
}

module.exports = CallbackPool;

