// Problem Description – Concurrency-Limited Task Executor

// You are given an array of asynchronous tasks and a number maxConcurrent. 
// Your task is to execute the tasks while ensuring that no more than maxConcurrent tasks run at the same time. 
// As soon as one task completes, the next pending task should start. 
// The final output must preserve the original task order.

    /**REVISIT */

async function taskScheduler(tasks, maxConcurrent) {
    const result = new Array(tasks.length);
    let i = 0;
    let running = 0;

    return new Promise((resolve, reject) => {

        function runNext() {
            if (i === tasks.length && running === 0) {
                return resolve(result);
            }

            while (running < maxConcurrent && i < tasks.length) {
                const currIdx = i++;
                running++;

                Promise.resolve(tasks[currIdx]())
                    .then((data) => {
                        result[currIdx] = data;
                    })
                    .catch(reject)
                    .finally(() => {
                        running--;
                        runNext();
                    });
            }
        }

        runNext();
    });
}


module.exports = taskScheduler;
