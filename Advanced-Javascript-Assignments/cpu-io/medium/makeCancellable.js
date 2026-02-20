
// Problem Description – Abortable Promise Wrapper

// You are required to wrap a Promise so that it can be cancelled using an AbortSignal.
// If the signal is aborted before the Promise settles, the wrapper should immediately reject with an appropriate error. 
// If not aborted, it should resolve or reject normally.
    /**DONE */
function makeCancellable(promise, signal) {

    if(signal.aborted){
       return Promise.reject( new Error("Aborted"))
        
    }

    return new Promise((resolve, reject)=>{
        promise.then((data)=>{
            if(signal.aborted){
                reject(new Error("Aborted"))
            }

            resolve(data)
        })
        .catch((err)=>{
            reject( err)
        })
    })

}

module.exports = makeCancellable;
