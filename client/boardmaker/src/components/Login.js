import React, { useState } from 'react';
import { ReactComponent as TestSvg } from '../icons/save.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/v1/auth/sign_in';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the email and password to the Devise API
      const response = await axios.post(API_URL, { email, password });

      // Get the JWT token and store it in localStorage
      const { data } = response;
      const token = response.headers['access-token'];
      const client = response.headers['client'];
      const uid = response.headers['uid'];


      localStorage.setItem('access-token', token);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);

      // Redirect to a protected route (e.g., dashboard)
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TestSvg/>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
