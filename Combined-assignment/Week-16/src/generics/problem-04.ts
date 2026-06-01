// Problem Statement:
// Write a generic function sum that accepts an array of numbers and returns the sum of all the numbers.

export function sum(arr:number[]):number{
    let sum = 0;
    arr.forEach((num)=>{
        sum += num
    })

    return sum;
}