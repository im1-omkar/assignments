// Problem Description – Async Initialization Gate

// You are required to design a mechanism for APIs that depend on an asynchronous initialization step. 
// Any calls made before initialization completes should wait and execute only after the initialization finishes. 
// Calls made after initialization should run immediately without waiting.
class GuardedAPI {
  constructor() {
    this.initDone = false;
    this.queue = [];
  }

  init(initTask) {
    initTask(()=>{
      this.initDone = true;
      this._flush()
    })
  }

  call(apiFn, onComplete) {

    if(this.initDone == true){
      apiFn(onComplete)
    }
    else{
      this.queue.push({apiFn, onComplete})
    }

  }

  _flush() {
    
    while(this.queue.length != 0){
      const currTask = this.queue.shift()
      this.call(currTask.apiFn, currTask.onComplete)
    }

  }
}

module.exports = GuardedAPI;

