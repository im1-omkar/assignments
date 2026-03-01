// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.

      /**DONE */
class Mutex {
  constructor() {
    this.tasks = [];
    this.locked = false;
  }

  lock(task, onComplete) {

    if(this.tasks.length == 0 && this.locked == false){
       this.locked = true;
       this.next(task, onComplete);
    }
    else{
      this.tasks.push([task, onComplete])
    }
  }

  next(task, onComplete){
    task((err, result)=>{
      if(err){
        onComplete(err, null)
      }
      else{
        onComplete(null, result)
      }      

      if(this.tasks.length > 0){
        const currTask = this.tasks.shift()
        this.next(currTask[0], currTask[1])
        return;
      }

      this.locked = false;
    })
  }

}

module.exports = Mutex;
