
// Problem Description – Recursive Fetch with Redirect Handling

// You are required to fetch data for a given set of IDs. 
// Each response may contain a redirectId, indicating that the data should be fetched again using the new ID. 
// The process must continue until the final data is reached. 
// Your implementation should also detect and prevent infinite redirect loops.

    /**DONE */

async function fetchDeep(ids, fetcher, maxDepth = 5) {

    async function fetch(id, fetcher, maxDepth, depth ){
        //base case
        if(depth > maxDepth){
            throw new Error("Max redirect depth exceeded")
        }

        try{
            let value = await fetcher(id)

            if(value["redirectId"]){
                //returning a promise in recursion
                return fetch(value["redirectId"], fetcher, maxDepth, depth+1)
            }

            return value;
        }
        catch(err){
            throw err
        }

    }

    //wrap every element of array into async function
    const wrapped = Object.entries(ids).map(([key, value])=>{
        return Promise.resolve(fetch(value, fetcher, maxDepth, 0))
    })

    //const promises = wrapped.map((promise)=>{return promise()})

    const result = await Promise.all(wrapped)

    let i=0;
    Object.keys(ids).forEach((key, idx)=>{
        ids[key] = result[i++]
    })

    return ids;

}

module.exports = fetchDeep;
