// Problem Description – retryWithBackoff(fn, retries, delay)

// You are required to write a function named retryWithBackoff that attempts to execute an asynchronous function fn. 
// If the execution fails, the function should wait for a specified delay in milliseconds before retrying. 
// This retry process should continue until the function succeeds or the maximum number of retries is reached.
async function retryWithBackoff(fn, retries, delay) {

    let tries = 0;
    let success = false

    while(tries <= retries && success == false){
        if(tries > 0){
            await new Promise((resolve)=>{setTimeout(()=>{resolve()},delay)})
        }

        try{
            return await fn().then((data)=>{
                success = true
                return data
            })
        }
        catch(err){

        }

        tries++;
    }

    if(tries >= retries ){
        throw new Error("always fails")

    }


}

module.exports = retryWithBackoff;
