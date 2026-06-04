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
            console.log("request is made to backend :)")
            const result = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                firstName,
                lastName
            })

            console.log(result.data)

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
            console.log("error while making request :)")
            if(err instanceof Error){
                setLoading(false);
                setError(err.message);
                setWrongCred(true);
            }
        }

    }

    const inputStyle = {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #d1d5db",
        fontSize: "15px",
        outline: "none",
    }

  return (
        <div
            style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
            fontFamily: "Arial",
            }}
        >
            <div
            style={{
                width: "350px",
                backgroundColor: "white",
                padding: "35px",
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
            }}
            >
            <div style={{ textAlign: "center" }}>
                <h1
                style={{
                    marginBottom: "5px",
                    fontSize: "32px",
                }}
                >
                Signup
                </h1>

                <p style={{ color: "gray", marginTop: "0px" }}>
                Create your account 
                </p>
            </div>

            <input
                placeholder="Username"
                type="text"
                onChange={(e) => {
                setUsername(e.target.value)
                }}
                style={inputStyle}
            />

            <input
                placeholder="Password"
                type="password"
                onChange={(e) => {
                setPassword(e.target.value)
                }}
                style={inputStyle}
            />

            <input
                placeholder="First Name"
                type="text"
                onChange={(e) => {
                setFirstName(e.target.value)
                }}
                style={inputStyle}
            />

            <input
                placeholder="Last Name"
                type="text"
                onChange={(e) => {
                setLastName(e.target.value)
                }}
                style={inputStyle}
            />

            {loading ? (
                <div style={{ textAlign: "center" }}>Loading...</div>
            ) : (
                <button
                onClick={() => {
                    handleSignup()
                }}
                style={{
                    padding: "12px",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "16px",
                    cursor: "pointer",
                    transition: "0.2s",
                }}
                >
                Submit
                </button>
            )}

            {signUpSuccess && (
                <div
                style={{
                    color: "green",
                    textAlign: "center",
                    fontWeight: "bold",
                }}
                >
                Signup successful! Redirecting...
                </div>
            )}

            {wrongCred && (
                <div
                style={{
                    color: "red",
                    textAlign: "center",
                    fontSize: "14px",
                }}
                >
                Signup failed! {error}
                </div>
            )}
            </div>
        </div>
        )
}

export default Signup
