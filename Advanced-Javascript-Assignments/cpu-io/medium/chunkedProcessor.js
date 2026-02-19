// Problem Description – Smart Progress Bar (CPU Yielding)
//
// You need to process a large list of items without blocking
// the event loop.
//
// Process the items in small chunks and yield control back
// to the event loop after each chunk so the system stays responsive.
//
// Requirements:
// - Implement chunkedProcessor(items, processFn, onComplete).
// - Process items in fixed-size chunks.
// - Yield using setImmediate after each chunk.
// - Call onComplete after all items are processed.
async function chunkedProcessor(items, processFn, onComplete) {

    for(let i=0; i<items.length; i++){

        processFn(items[i])

        if(i%100 === 0){
           await new Promise((resolve)=>{setTimeout(()=>{resolve()},10)})
        } 
    }

    onComplete()

}

module.exports = chunkedProcessor;
