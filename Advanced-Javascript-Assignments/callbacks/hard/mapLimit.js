// Problem Description – Parallel Execution with Concurrency Limit
//
// You need to execute many asynchronous tasks (e.g., image downloads),
// but only a fixed number are allowed to run at the same time to avoid
// resource exhaustion.
//
// This problem tests concurrency control and result ordering.
//
// Requirements:
// - Accept an array of tasks and a concurrency limit.
// - Run at most `limit` tasks in parallel until all are completed.
// - Return results in the original task order via onAllFinished.

    /**DONE */
function mapLimit(tasks, limit, onAllFinished) {
    let running = 0;
    let count = 0;
    let completed = 0;
    const result = new Array(tasks.length)


    function _run(){

        while(running < limit){
            running++;
            const currIdx = count;
            const currTask = tasks[count++]

            currTask((err, data)=>{
                completed++;
                if(err){
                    result[currIdx] = err;
                }
                else{
                    result[currIdx] = data;
                }
                
                if(count < tasks.length){
                    running--;
                    _run()
                    return;
                }

                if(completed == tasks.length){
                    onAllFinished(null, result)
                }

            })  
        }

    }

    if(running == 0){
        _run()
    }

}

module.exports = mapLimit;
