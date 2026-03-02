// Problem Description – Preemptive Priority Task Scheduler
//
// You are required to build a scheduler that executes async tasks
// based on priority.
//
// Higher-priority tasks should be executed before lower-priority ones.
// Long-running tasks must periodically yield control back to the scheduler
// so that newly arrived high-priority tasks can be processed.
//
// True preemption is not possible in JavaScript, so tasks must cooperate
// by yielding execution voluntarily.

      /**DONE */

class Scheduler {
  constructor() {
    this.tasks = [];
  }

  schedule(task, priority = 0) {
    this.tasks.push({ task, priority });
  }

  run(onAllFinished) {

    this.tasks.sort((a, b) => b.priority - a.priority);

    let index = 0;

    const runNext = () => {
      if (index >= this.tasks.length) {
        onAllFinished(null);  
        return;
      }

      const { task } = this.tasks[index++];
      
      task((err) => {
        if (err) {
          onAllFinished(err);
          return;
        }

        runNext();
      });
    };

    runNext();
  }
}

module.exports = Scheduler;