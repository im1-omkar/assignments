// Problem Description – everyAsync(array, predicate)

// You are required to implement a function named everyAsync that accepts an array and an asynchronous predicate function. 
// The function should evaluate the predicate for each element and resolve to true only if all predicates return true. 
// The evaluation should stop immediately and resolve to false as soon as any predicate fails.

    /**DONE */

async function everyAsync(array, predicate) {

    for(const ele of array){
        try{
            const temp = await predicate(ele);

            if(!temp){
                return false;
            }
        }
        catch(err){
            throw new Error(err)
        }
    }

    return true;

}

module.exports = everyAsync;

