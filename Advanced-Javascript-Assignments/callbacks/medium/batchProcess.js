// Problem Description – Ordered Parallel Batcher
//
// You need to process many items in parallel, but with a fixed
// concurrency limit to avoid resource exhaustion.
//
// Tasks should start as soon as a slot is free, and the final
// results must preserve the original input order.
//
// Requirements:
// - Run at most `limit` workers in parallel.
// - Preserve the original order of results.
// - Start new work as soon as one finishes.
// - Stop and return an error if any task fails.

function batchProcess(items, limit, worker, onComplete) {
    const results = new Array(items.length);
    let running = 0;
    let currentIndex = 0;
    let finishedCount = 0;
    let stopped = false; 

    function runNext() {
        if (stopped) return;

        if (finishedCount === items.length) {

            return onComplete(null, results);

        }

        while (running < limit && currentIndex < items.length) {

            const index = currentIndex++;
            const item = items[index];

            running++;

            worker(item, (err, result) => {

                running--;
                if (stopped) return;

                if (err) {
                    stopped = true;
                    return onComplete(err, null);
                }

                results[index] = result;
                finishedCount++;

                runNext(); 
                
            });
        }
    }

    runNext();
}

module.exports = batchProcess;
