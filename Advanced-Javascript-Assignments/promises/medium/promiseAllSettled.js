// Problem Description – Polyfill for Promise.allSettled

// You are required to implement a polyfill for Promise.allSettled. 
// The function should accept an array of Promises and wait for all of them to either resolve or reject.
// It must return a Promise that resolves with an array of result objects describing the status and value or reason of each Promise.
async function promiseAllSettled(promises) {
    
    const promisified = promises.map(p => Promise.resolve(p));
    //const result = []

    const result = await Promise.all(promisified)

    return result;

}

module.exports = promiseAllSettled;

