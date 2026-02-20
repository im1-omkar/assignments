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

    /**DONE but once check the setImmediate function as it is throwing error for new Array(50000) but not thworing error for new Array(500) --> in test */
async function chunkedProcessor(items, processFn, onComplete) {
  const CHUNK_SIZE = 100;

  for (let i = 0; i < items.length; i++) {
    processFn(items[i]);

    if ((i + 1) % CHUNK_SIZE === 0) {
      await new Promise(resolve => setImmediate(resolve));
    }
  }

  onComplete();
}

module.exports = chunkedProcessor;
