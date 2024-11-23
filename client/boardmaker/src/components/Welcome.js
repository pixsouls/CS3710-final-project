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
      <button onClick={() => handleNavigate('/dashboard')}>Login</button>
      <button onClick={() => handleNavigate('/user/create')}>Signup</button>
    </div>
  );
}

export default Welcome;
