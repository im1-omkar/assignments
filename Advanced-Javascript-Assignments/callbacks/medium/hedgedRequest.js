// Problem Description – Hedged Request
//
// You have a Primary async source and a Secondary backup.
// Start the Primary immediately. If it is slow, start the Secondary.
//
// Return the first successful result and ignore the rest.
// Only fail if both fail, and ensure the callback runs once.
//
// Requirements:
// - Start Primary immediately.
// - Start Secondary after timeoutMs if needed.
// - First success wins.
// - Callback must be called exactly once.

    /**DONE */


function hedgedRequest(primary, secondary, timeoutMs, onComplete) {
    let secondaryId = null;
    let secondaryFail = null;
    let primaryFail = null;
    let complete = false;

    primary((err, result)=>{

        if(err){
            primaryFail = true;
            if(secondaryFail == true){
                onComplete(err, null);
            }
            return;
        }

        clearTimeout(secondaryId);

        if(complete == false ){
            complete = true;
            primaryFail = false;
            onComplete(null,result);
            return;
        }

    })

    secondaryId = setTimeout(()=>{

        secondary((err, result)=>{

            if(err){ /**is error getting called again ? */
                secondaryFail = true;
                if(primaryFail == true){
                    onComplete(err,null)
                }
                return;
            }

            if(complete == false){
                complete = true;
                secondaryFail = false;
                onComplete(null, result);
            }
        })

    },timeoutMs)


}

module.exports = hedgedRequest;
