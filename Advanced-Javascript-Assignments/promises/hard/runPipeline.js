// Problem Description – Abortable Async Pipeline
//
// You are required to implement an async pipeline that executes
// an array of async functions sequentially (waterfall execution).
//
// The pipeline must support cancellation using AbortController.
// If the abort signal is triggered:
// 1. Execution must stop immediately
// 2. Any pending async operation should be aborted
// 3. The pipeline must throw an AbortError
//

            /**DONE */
            
async function runPipeline(fns, signal) {
    const functions = fns

    return new Promise((resolve, reject)=>{
        function _run(){
            if (signal?.aborted) {
                reject(new Error("Abort"))
            }
            const fn = functions.shift()

            Promise.resolve(fn()).then((data)=>{
                if(functions.length > 0){
                    _run()
                }
                else{
                    resolve()
                }
            }).catch((err)=>{
                if(err.name === "AbortError"){
                    reject(new Error("Abort"))
                }
            })
        }

        _run()
    })

}

module.exports = runPipeline;

  