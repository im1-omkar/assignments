import React from 'react';

export default function Home() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left', lineHeight: '1.6' }}>
      <h1>Welcome to the Auth System Demo</h1>
      
      <p>This demo showcases two approaches to managing authentication state in React:</p>
      
      <ul>
        <li>State Lifting</li>
        <li>Context API</li>
      </ul>
      
      <p>Use the toggle above to switch between the two approaches.</p>
    </div>
  );
}