import React from 'react';

export default function AppBar({ isLoggedIn, onLogout }) {
  return (
    <header style={{ 
      padding: '15px 20px', 
      background: '#2c3e50', 
      color: '#fff', 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center' 
    }}>
      <h2>Navbar</h2>
      {isLoggedIn && (
        <button 
          onClick={onLogout} 
          style={{ padding: '8px 12px', cursor: 'pointer', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Logout
        </button>
      )}
    </header>
  );
}