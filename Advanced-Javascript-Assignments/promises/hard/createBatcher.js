// Problem Description – Request Batcher
//
// You are required to implement a batcher that groups multiple requests
// within a short time window into a single bulk request.
//
// Requirements:
// 1. Requests added within the batch window must be sent together
// 2. Each caller must receive only its own result
// 3. Only one network call should be made per batch window

            /**DONE */

function createBatcher(fetchBulk, delayMs = 50) {
    const requests = [[],[],[]] //requests[[ids],[resolves]]
    
    return (id)=>{
        return new Promise((resolve, reject)=>{
            requests[0].push(id)
            requests[1].push(resolve)
            requests[2].push(reject)

            if(requests[0].length == 1){
                setTimeout(()=>{
                    const currRes = requests[1]
                    const currIds = requests[0]
                    const currRej = requests[2]
                    requests[0] = []
                    requests[1] = []
                    requests[2] = []
                    Promise.resolve(fetchBulk(currIds)).then((data)=>{
                        currRes.forEach((res,idx)=>{
                            res(data[currIds[idx]])
                        })
                    }).catch((err)=>{
                        currRej.forEach((rej,idx)=>{
                            rej(new Error("Network error"))
                        })
                    })
                },delayMs)
            }
        })
    }

}

module.exports = createBatcher;
