// Problem Description – switchMap(apiCall)

// You are required to implement a utility function named switchMap to handle rapidly triggered asynchronous requests, such as those from a search input.
// When multiple calls are made in quick succession, only the result of the most recent call should be used. 
// If an earlier request resolves after a later one, its result must be ignored

    /**DONE */
    
 function switchMap(apiCall) {
    
    let currResolve = null;
    let currId = null;

    return  (val, delay)=>{

        if(currResolve){
            clearTimeout(currResolve);
            currResolve()
        }

        return new Promise((resolve,reject)=>{
            currResolve = resolve;

            currId = setTimeout(async()=>{
                currId = null;
                currResolve = null;

                try{
                    const result = await apiCall(val,delay);
                    resolve(result);
                }
                catch(err){
                    reject(err)
                }

            }, delay)

        })

    }

}

module.exports = switchMap;
