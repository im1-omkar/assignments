// Problem Description – I/O Operation With Timeout
//
// You are given an asynchronous function that represents an I/O-bound task
// (such as a network request or database call).
//
// Your task is to execute this function, but enforce a time limit.
// If the I/O operation does not complete within the specified number
// of milliseconds, the returned promise should reject with a "Timeout" error.

    /**DONE */
async function ioWithTimeout(fn, ms) {

    return new Promise((resolve, reject)=>{
        const id = setTimeout(()=>{
            reject("Timeout")
        },ms)

        fn().then(()=>{resolve("data")})
    })

}

module.exports = ioWithTimeout;


async function fun(){
    setTimeout(()=>{
        console.log("1");
    },1000)

     function fun2(){
        const now = new Date()
        while(new Date() - now >2000){
            return "hello"
        }
    }

    const result =  fun2()
    console.log(result)
}