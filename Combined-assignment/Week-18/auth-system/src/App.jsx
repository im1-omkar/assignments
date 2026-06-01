import AuthSystem from './components/AuthSystem';
import './Auth.css';
import React from 'react';

function App() {
  const [username, setUsername] = React.useState('');
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return <AuthSystem />;
}

export default App;
