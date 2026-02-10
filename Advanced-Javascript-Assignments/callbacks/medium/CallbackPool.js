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
    this.currRunning = 0;
  }

  run(task, onComplete) {
    this.queue.push({task, onComplete});
    this._next()
   
  }

  _next() {
    
    if(this.currRunning < this.limit){
      this.currRunning++;
      const currTask = this.queue.shift();

      currTask.task((err, result)=>{
        this.currRunning--;

        currTask.onComplete(err, result);

        if(this.queue.length != 0){
          this._next();
        }

      })
    }
    else{

    }
    
  }
}

module.exports = CallbackPool;

