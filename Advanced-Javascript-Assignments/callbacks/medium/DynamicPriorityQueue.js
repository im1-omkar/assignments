// Problem Description – Priority Task Queue with Dynamic Concurrency

// You are required to implement a task queue that executes asynchronous tasks based on priority. 
// Higher-priority tasks should be executed before lower-priority ones. 
// The queue must enforce a concurrency limit, ensuring only a fixed number of tasks run at the same time, and allow this limit to be updated dynamically while the system is running.
class DynamicPriorityQueue {
  constructor(concurrency) {
    this.limit = concurrency;
    this.queue = []
    this.currRunning = 0
  }

  setLimit(newLimit) {
    this.limit = newLimit;
    this.runNext()
  }

  add(task, priority, onComplete) {
    this.queue.push({task, priority, onComplete})
    this.queue.sort((a,b)=> b.priority - a.priority)
    this.runNext()
  }

  runNext() {

    if(this.currRunning < this.limit){
      this.currRunning++;
      const currTask = this.queue.shift();

      currTask.task((err, result)=>{
        this.currRunning--;

        currTask.onComplete(err, result);

        if(this.queue.length != 0){
          this.runNext();
        }
      })
    
    }

  }
}

module.exports = DynamicPriorityQueue;
