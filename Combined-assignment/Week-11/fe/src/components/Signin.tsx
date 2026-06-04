import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const Signin = () => {
  const [username,setUsername] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess]  = useState(false)
  const [error,setError] = useState("")

  const navigate = useNavigate()

  const handleSignin = async()=>{
    try{
      setLoading(true)

      const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
        username,
        password
      })

      setLoading(false)
      if(response.status == 200){
        //show success message and redireting message ....
        setIsSuccess(true)
        //set the token 
        localStorage.setItem('authToken',response.data.token)
        setTimeout(()=>{
          navigate('/dashboard')
        },3000)
        return;
      }

    }catch(err){
      setLoading(false)
      setIsError(true)
      
      if(err instanceof Error){
        console.log("error has occured")
        console.log(err.message)
        setError(err.message)
        return;
      }
      setError("unknown error occured")
      return;
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
        width: "100vw",
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
            Sign In
          </h1>

          <p
            style={{
              color: "gray",
              marginTop: "0px",
            }}
          >
            Welcome back 
          </p>
        </div>

        <input
          onChange={(e) => {
            setUsername(e.target.value)
          }}
          type="text"
          placeholder="Username"
          style={inputStyle}
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          type="password"
          placeholder="Password"
          style={inputStyle}
        />

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading...</div>
        ) : (
          <button
            onClick={() => {
              handleSignin()
            }}
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        )}

        {isError && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {isSuccess && (
          <div
            style={{
              color: "green",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Signin successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  )
}

export default Signin