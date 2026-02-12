// Problem Description – Idempotent Async Execution
//
// You need to ensure that an asynchronous task identified by a key
// runs only once. If the same task is triggered again while it is
// still running, all callers should receive the same result.
//
// This problem tests deduplication and state synchronization.
//~
    
    /**DONE */

function createIdempotentExecutor() {
    let currTask = {"key":null, "promise":null};

    return (key, fn)=>{

        if(key != currTask.key){
            currTask.key = key;
            currTask.promise = new Promise((resolve)=>{resolve(fn())}).then((data)=>{
                currTask.key = null;
                currTask.promise = null;

                return data;
            })
            .catch((err)=>{
                currTask.key = null;
                currTask.promise = null;

                throw new Error(err);
            })
        }

        return currTask.promise;

    }
}

module.exports = createIdempotentExecutor;
