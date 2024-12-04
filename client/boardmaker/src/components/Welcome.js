import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <h2>Visual Concepting App</h2>
      <h5>Please Choose an option:</h5>
      <button onClick={() => handleNavigate('/login')}>Login</button>
      <button onClick={() => handleNavigate('/user/create')}>Signup</button>
    </div>
  );
}

export default Welcome;
