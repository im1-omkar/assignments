// Problem Description – Sum of Two Promises

// You are given two Promises that each resolve to numeric values. 
// Your task is to return a new Promise that resolves to the sum of these two numbers. 
// Both Promises should be executed in parallel using Promise.all to avoid unnecessary waiting.
async function sumPromises(p1, p2) {
    let answer = 0;

    return new Promise((resolve, reject)=>{
        Promise.all([p1,p2]).then((results)=>{
            results.forEach((ans)=>{
                answer += ans;
            })

            resolve(answer);
        })  
    })

}

module.exports = sumPromises;

