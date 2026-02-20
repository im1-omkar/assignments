// Problem Description – Non-Blocking Large Array Processing

// You are given a very large array containing around 100,000 items that must be processed. 
// Your task is to implement a strategy that performs this processing without blocking the main thread, ensuring the browser UI remains responsive. 
// The solution should break the work into smaller chunks and schedule them asynchronously.

        /**DONE */

async function processLargeArray(items, processFn) {
    
    let n = items.length
    for(let i=0; i<n; i++){
        try{
            processFn(items[i])

            if(i%100 ==0){
                await new Promise((resolve, reject)=>{
                    setImmediate(resolve)
                })
            }
        }
        catch(err){
            throw err
        }
    }

}

module.exports = processLargeArray;
