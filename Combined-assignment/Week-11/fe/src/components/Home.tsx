import { Link } from "react-router"

const Home = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right,rgb(32, 31, 31),rgb(46, 47, 50))",
        fontFamily: "Arial",
        color: "white",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.08)",
          padding: "50px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          width: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
           PayTM Lite
        </h1>

        <p
          style={{
            color: "#d1d5db",
            marginBottom: "35px",
            fontSize: "18px",
          }}
        >
          The Great Money Transferring Application 
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to="/signup">
            <button
              style={{
                padding: "12px 28px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: "white",
                color: "black",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </button>
          </Link>

          <Link to="/signin">
            <button
              style={{
                padding: "12px 28px",
                border: "1px solid white",
                borderRadius: "12px",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home