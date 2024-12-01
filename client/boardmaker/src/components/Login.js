import React, { useState } from 'react';
import { ReactComponent as TestSvg } from '../icons/save.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/v1/auth/sign_in';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setLoading(true);

    try {
      // Send the email and password to the Devise API
      const response = await axios.post(API_URL, {
        email: email,
        password: password
      }, { withCredentials: true });  
      

      const { data } = response;
      const token = response.headers['access-token'];
      const uid = response.headers['uid'];

      // Log all headers to debug
      console.log(response.headers);
      console.log("token = " + token);
      console.log("uid = " + uid);

      // Check if the token, client, and uid are returned
      if (token && uid) {
        // Store the token, client, and uid in localStorage
        localStorage.setItem('access-token', token);
        localStorage.setItem('uid', uid);
  
        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        setError('Authentication failed. Tokens are missing.');
      }
    } catch (err) {
      // Handle any errors that occurred during the login
      console.error("Login error", err);
      setError('Invalid email or password');
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <TestSvg />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
