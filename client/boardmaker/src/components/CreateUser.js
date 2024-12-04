import '../css/CreateUser.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';

function CreateUser() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== passwordConfirmation) {
      setMessage('Passwords do not match');
      return;
    }

    const newUser = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post(API_URL, { user: newUser });
      setMessage(`User created successfully: ${response.data.name}`);
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
        {message && <h4>{message}</h4>}
      </form>
    </div>
  );
}

export default CreateUser;
