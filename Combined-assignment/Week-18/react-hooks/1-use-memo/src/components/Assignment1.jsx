import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    
    const expensiveValue = useMemo(()=>{
        if(input < 0) return null;
        if(input == 0) return 1;

        let fact = 1;
        for(var i=1; i<=input ; i++){
            fact = fact*i;
        }

        return fact;
    },[input])

    return (
        <div className="container">
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}
