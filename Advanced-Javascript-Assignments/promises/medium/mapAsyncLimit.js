// Problem Description – Asynchronous Map with Concurrency Limit

// You are required to implement an asynchronous version of Array.map that processes items using an async callback function. 
// Unlike the standard map, this version should only process a limited number of items concurrently. 
// As soon as one operation finishes, the next should begin.
// The final result must preserve the original order of the input array.

    /**DONE */

async function mapAsyncLimit(array, limit, asyncFn) {
    const final = []
    let i=0;
    let n = array.length;

    while(i < n){

        const batch = []
        let j = 0;

        while(j < limit && i< n){
            batch.push(Promise.resolve(asyncFn(array[i])))
            j++;
            i++;
        }

        const result = await Promise.all(batch)
        final.push(...result)

    }

    return final;
}

module.exports = mapAsyncLimit;

