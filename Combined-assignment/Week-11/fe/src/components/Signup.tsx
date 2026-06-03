import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const Signup = () => {
    const navigate = useNavigate();
  
    const [username,setUsername] = useState<string | null>(null)
    const [password,setPassword] = useState<string | null>("")
    const [firstName, setFirstName] = useState<string | null>("")
    const [lastName,setLastName] = useState<string | null>("")

    const [loading, setLoading] = useState(false)
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    const [wrongCred, setWrongCred] = useState(false)
    const [error, setError] = useState("")

    const handleSignup = async()=>{
        setLoading(true)
        
        //make the request to the server with given credentials
        try{
            const result = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                firstName,
                lastName
            })

            //if status-200 => redirect to signin
            if(result.status == 201){
                //something which update the state :)
                setLoading(false)
                setSignUpSuccess(true)

                setTimeout(()=>{
                    navigate("/signin")
                },3000)

                return
            }
        }
        catch(err){
            if(err instanceof Error){
                setLoading(false);
                setError(err.message);
                setWrongCred(true);
            }
        }

    }

  return (
    <div>
        <div>
            <h1>Signup</h1>
            <div>
                <input placeholder="USERNAME" type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                <input placeholder="PASSWORD" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <input placeholder="FIRSTNAME" type="text" onChange={(e)=>{setFirstName(e.target.value)}}/>
                <input placeholder="LASTNAME" type="text" onChange={(e)=>{setLastName(e.target.value)}}/>
                {loading? "Loading..." : <button onClick={()=>{handleSignup()}}>Submit</button>}
                {signUpSuccess &&  "Signupsuccess! redirecting ..." }
                {wrongCred && "signup could not be possible !" + error}
            </div>
        </div>
    </div>
  )
}

export default Signup
