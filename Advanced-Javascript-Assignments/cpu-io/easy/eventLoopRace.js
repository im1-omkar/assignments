// Problem Description – Event Loop Execution Order
//
// You are given a script that mixes synchronous code, Promises (microtasks),
// and timers (macrotasks).
//
// Your task is to understand and predict the order in which the logs
// are printed to the console.
//

    /**DONE */
function eventLoopRace() {
    
    const sync1 = ()=>{console.log("1: Synchronous")}
    sync1()
    setTimeout(()=>{console.log("2: Macrotask (I/O)")}, 10)
     Promise.resolve().then(() => {
        console.log("3: Microtask (Promise)");
    });
    const sync2 = ()=>{console.log("4: Synchronous")}
    sync2();

}

module.exports = eventLoopRace;
