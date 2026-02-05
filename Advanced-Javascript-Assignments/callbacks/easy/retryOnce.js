// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 

    //***DONE */


function retryOnce(fn) {
    return  (callback)=>{
        fn((err1, data)=>{
            if(data){
                callback(data);
                return;
            }

            fn((err2,data)=>{
                if(err2){
                    callback(err2, null);
                    return
                }

                callback(null,data)
            })
        })
    }
}

module.exports = retryOnce;