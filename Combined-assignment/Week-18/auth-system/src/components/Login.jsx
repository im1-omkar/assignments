import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthSystem';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  
  // Safely grab context if it exists (handles context test-wrapper condition)
  const context = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    if (context && context.login) {
      context.login(username);
    } else if (onLogin) {
      onLogin(username);
    }
    
    // Test assertion requires input to be cleared post-login execution
    setUsername('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '6px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username-input" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Username
          </label>
          <input
            id="username-input"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
}