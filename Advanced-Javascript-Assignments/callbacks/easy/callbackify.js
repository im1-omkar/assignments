// Problem Description – promisify(fn)

// You are required to write a function named callbackfiy that takes a function following the callback pattern (error, data) => void. 
// The goal is to convert this function into one that returns a Promise. 
// The Promise should resolve with the data when no error occurs and reject when an error is provided.


function callbackify(fn) {

   return function(...args){
      const callback = args.pop();

      fn(...args).then((data)=>{
         callback(null, data);
      })
      .catch((err)=>{
         callback(err, null)
      })

   }

}

module.exports = callbackify;