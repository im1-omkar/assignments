import axios from "axios"
import { useEffect, useState } from "react"

interface User {
  user_name: string,
  first_name: string,
  last_name: string
}

const Dashboard = () => {
  const [searchResults, setSearchResults] = useState<null | User[]>(null)
  const [filter, setFilter] = useState<null | string>(null)
  const [balance, setBalance] = useState<null | number>(null)
  const [amount, setAmount] = useState<number | null>(null)
  const [toTransfer, setToTransfer] = useState("")
  const [loadingTransaction, setLoadingTransaction] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [updatingProfile, setUpdatingProfile] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)


  const handleUpdateProfile = async () => {
    try {
      setUpdatingProfile(true)

      await axios.put(
        "http://localhost:3000/api/v1/user",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )

      setEditMode(false)
      setUpdatingProfile(false)

    } catch (err) {
      setUpdatingProfile(false)
      console.log(err)
    }
  }

  useEffect(() => {


    if (!filter || filter.trim() === "") {
      setSearchResults(null)
      return
    }

    const delayDebounce = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(delayDebounce)

  }, [filter])


  const handleSearch = async () => {
    setSearchLoading(true)
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`)

      if (response.status == 200) {
        setSearchResults(response.data.users)
      }

      setSearchLoading(false)
    } catch (err) {
      setSearchLoading(false)
      if (err instanceof Error) {
        console.log(err.message)
      }
      console.log("unknown error")
    }
  }

  const handleTransfer = async () => {
    try {
      setLoadingTransaction(true);
      await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          toTransfer,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )

      // refetch balance after transfer
      getBalance()
      setLoadingTransaction(false);

    } catch (err) {
      setLoadingTransaction(false);
      console.log(err)
    }
  }

  async function getBalance() {
    //get the balance and set the balance
    try {
      const response = await axios.get('http://localhost:3000/api/v1/account/balance',
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        })

      setBalance(response.data.balance)
    } catch (err) {
      if (err instanceof Error) {

      }
    }
  }

  useEffect(() => {
    getBalance()

  }, [])

  const inputStyle = {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f3f4f6",
        fontFamily: "Arial",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          backgroundColor: "white",
          padding: "20px 30px",
          borderRadius: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}> Dashboard</h1>
          <p style={{ color: "gray", marginTop: "6px" }}>
            Welcome
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editMode ? "Close" : "Edit"}
          </button>

          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "black",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            O
          </div>
        </div>
      </div>

      {editMode && (
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            marginBottom: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={{ margin: 0 }}>Edit Profile</h2>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleUpdateProfile}
            style={{
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "black",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {updatingProfile ? "Updating..." : "Submit"}
          </button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* SEARCH SECTION */}
        <div
          style={{
            flex: 1,
            minWidth: "350px",
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            position: "relative",
          }}
        >
          <h2 style={{ marginTop: 0 }}> Search Users</h2>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search users..."
              value={filter || ""}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              style={{
                ...inputStyle,
                borderRadius:
                  searchResults && searchResults.length > 0
                    ? "16px 16px 0 0"
                    : "16px",
              }}
            />

            {searchLoading && (
              <div
                style={{
                  marginTop: "10px",
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                Searching...
              </div>
            )}

            {searchResults && searchResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderTop: "none",
                  borderRadius: "0 0 16px 16px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  zIndex: 1000,
                  overflow: "hidden",
                }}
              >
                {searchResults.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setFilter(user.user_name)
                      setToTransfer(user.user_name)
                      setSearchResults(null)
                    }}
                    style={{
                      padding: "14px 16px",
                      cursor: "pointer",
                      borderBottom:
                        index !== searchResults.length - 1
                          ? "1px solid #f3f4f6"
                          : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white"
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {user.first_name} {user.last_name}
                    </div>

                    <div
                      style={{
                        fontSize: "13px",
                        color: "gray",
                        marginTop: "3px",
                      }}
                    >
                      {user.user_name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BALANCE + TRANSFER */}
        <div
          style={{
            flex: 1,
            minWidth: "350px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {/* BALANCE CARD */}
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: "16px", opacity: 0.8 }}>
              Current Balance
            </div>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              ₹ {balance == null ? "..." : balance}
            </div>
          </div>

          {/* TRANSFER CARD */}
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <h2 style={{ marginTop: 0 }}> Transfer Money</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <input
                type="number"
                placeholder="Enter amount"
                onChange={(e) => setAmount(Number(e.target.value))}
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Receiver username"
                value={toTransfer}
                onChange={(e) => setToTransfer(e.target.value)}
                style={inputStyle}
              />

              <button
                onClick={handleTransfer}
                style={{
                  padding: "14px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                {loadingTransaction
                  ? "Processing..."
                  : "Send Money "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;