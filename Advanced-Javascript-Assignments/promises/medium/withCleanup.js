// Problem Description – Guaranteed Async Cleanup
//
// You need to wrap an asynchronous function so that a cleanup
// function is always executed, regardless of whether the async
// function succeeds or fails.
//

function withCleanup(fn, cleanup) {

    return async()=>{
        try{
            const result = await fn()
            cleanup()
            return result
        }
        catch(err){ 
            cleanup();
            throw new Error(err)
        }
    }
    

}

module.exports = withCleanup;

