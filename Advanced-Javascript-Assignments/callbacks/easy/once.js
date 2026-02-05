// Problem Description – once(fn)

// You are required to implement a wrapper function named once that accepts an asynchronous function fn.
// The wrapper should ensure that fn is executed only on the first call.
// Any subsequent calls must not re-execute fn and should instead return the same Promise or resolved result from the first invocation.

/** DONE ** */

function once(fn) {
  let called = false;
  let finished = false;
  let cachedErr = null;
  let cachedData = null;
  let waitingCallbacks = [];

  return function (...args) {
    const callback = args.pop();

    if (!called) {
      called = true;

      waitingCallbacks.push(callback);

      fn(...args, (err, data) => {
        finished = true;
        cachedErr = err;
        cachedData = data;

        waitingCallbacks.forEach(cb => cb(err, data));
        waitingCallbacks = [];
      });

    } else if (!finished) {
      waitingCallbacks.push(callback);

    } else {
      callback(cachedErr, cachedData);
    }
  };
}

module.exports = once;



//*** another approach */


/**
 * 
 * 
 * function once(fn) {
  let called = false;
  let cachedErr = null;
  let cachedData = null;
  let waitingCallbacks = [];

  return function (...args) {
    const callback = args.pop();  // last argument is always callback

    if (!called) {
      called = true;

      // queue all callbacks that arrive before async fn finishes
      waitingCallbacks.push(callback);

      // call the original fn with a new callback
      fn(...args, (err, data) => {
        cachedErr = err;
        cachedData = data;

        // flush queued callbacks
        waitingCallbacks.forEach(cb => cb(err, data));
        waitingCallbacks = [];
      });

    } else {
      // fn already finished → call callback immediately
      callback(cachedErr, cachedData);
    }
  };
}

module.exports = once;

 */