// Problem Description – Time-Limited Async Function

// You are given an asynchronous function and a time limit t in milliseconds.
// Your task is to wrap this function so that it either resolves normally if it completes within the given time or rejects 
// with the message "Time Limit Exceeded" if execution takes longer than t.

    /**DONE */

function timeLimit(fn, t) {

    return async (...args)=>{
        new Promise((resolve, reject)=>{

        const id = setTimeout(()=>{
            reject('Time Limit Exceeded')
        },t)

        fn(...args).then((data)=>{
            clearTimeout(id)
            resolve(data);
        })

    })
    }

}

module.exports = timeLimit;