import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomUser.css'; // Import the external CSS file

const RandomUser = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function usersFetch(){
    setLoading(true)
    const response = await axios.get("https://randomuser.me/api");
    if(response) setData(response.data.results);
    setLoading(false)
  }

  useEffect(()=>{
    usersFetch()
  },[])

  async function loadMore (){
    setLoading(true)
    const response = await axios.get("https://randomuser.me/api?results=10");
    setData([...data,...response.data.results])
    setLoading(false)
  }
  
  return (
    <div>
    <div className="random-user-container">
     <h1>Random Users</h1>
     
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
      {
        loading && <h1>
            Loading...
        </h1>
      }
      { data && !loading &&
        data.map((user)=>{
          return <div style={{"border":"1px solid black", "width":"min-content"}}>
            <img 
              src={user.picture.medium} 
              alt="profile pic" 
            />
            <div>{user.name.first + " " + user.name.last}</div>
            <div>{user.email}</div>
          </div>
        })
      }
    </div>
    <div style={{ display:'flex', justifyContent:"center", padding:'100px'}}>
      <button onClick={()=>{loadMore()}} style={{widht:'50px', height:'50px','background':'green'}}>Load More Users</button>
    </div>
    </div>
  );
};

export default RandomUser;
