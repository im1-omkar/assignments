// Problem Description – Retry with Exponential Backoff and Jitter

// You are required to implement a retry mechanism for an asynchronous task that fails. 
// On each retry, the delay before the next attempt should increase, and a small random “jitter”
// should be added to the delay to prevent synchronized retries that can overload a server. 
// The process should stop once the task succeeds or the maximum retry limit is reached.

    /**DONE */
    
async function retryWithJitter(fn, retries = 3, baseDelay = 1000) {

    return new Promise((resolve, reject)=>{

        async function fetch(fn, retries, baseDelay, depth){
            //base case
            if(depth > retries){
                return reject(new Error("always fails"))
            }

            try{
                const data = await fn()
                resolve(data)
                return;
            }
            catch(err){
                await new Promise((res)=>{setTimeout(()=>{res()},baseDelay)})
                return fetch(fn, retries, baseDelay, depth+1)
            }
            
        }

        fetch(fn, retries, baseDelay,0)
    })

}

module.exports = retryWithJitter;
