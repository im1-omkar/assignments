// Write a function that takes a user's full name as input (a string) and returns a greeting with their initials.
// Use a type annotation for the input and output.
// Example Input: "Pixy Glee"
// Example Output: "Hello, P.G!"

export function greetWithInitials(name: string): string {
    const names: string[] = name.split(' ');
    const firstLetters : string[] = names.map((name:string)=>{
        return name[0]
    })
    let shortName = " ";
    firstLetters.forEach((name)=>{
        shortName = shortName + name[0] +  '.'
    })
    return "Hello," + shortName
}
