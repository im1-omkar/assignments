// Problem Description – Custom Implementation of Promise.all

// You are required to implement your own version of Promise.all without using the built-in method. 
// The function should accept an array of values that may include Promises or plain constants. 
// It must resolve with an array of results in the same order once all inputs resolve, or reject immediately if any input rejects.

    /**DONE */

function promiseAll(promises) {
    let finished = 0;
    const results = new Array(promises.length)

    return new Promise((resolve, reject)=>{

        if(promises.length == 0){
            resolve([])
        }

        promises.forEach((p,idx)=>{

            Promise.resolve(p).then((data)=>{
                results[idx] = data
                finished++;
                if(finished == promises.length){
                    resolve(results)
                }
            })
            .catch((err)=>{
                reject(err)
            })

        })

    })

}

module.exports = promiseAll;
