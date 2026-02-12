// Problem Description – batchAll(tasks, batchSize)

// You are required to implement a function named batchAll that processes an array of asynchronous tasks in fixed-size batches. 
// Each batch should execute its tasks concurrently, but the next batch must not start until all tasks in the current batch have completed.
    /**DONE */
async function batchAll(tasks, batchSize) {
    let i = 0;
    const result = [];

    while (i < tasks.length) {
        const batchPromises = [];
        let j = 0;

        while (j < batchSize && i < tasks.length) {
            const taskPromise = tasks[i](); 
            batchPromises.push(taskPromise);
            
            i++;
            j++;
        }

        const batchResult = await Promise.all(batchPromises);

        result.push(...batchResult);
    }

    return result;
}
module.exports = batchAll;
