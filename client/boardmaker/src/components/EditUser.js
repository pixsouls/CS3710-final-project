import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For route params (line 8)

const API_URL = 'http://localhost:3000/api/v1/users';

function EditUser() {
  const { id } = useParams(); // Get the user id from the URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data based on ID from URL
    const fetchUser = async () => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      setName(data.name);
      setEmail(data.email);
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
    };

    try {
      const response = await axios.patch(`${API_URL}/${id}`, { user: updatedUser });
      setMessage(`User updated successfully: ${response.data.name}`);
    } catch (error) {
      setMessage('Error updating user');
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
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
        <button type="submit">Update User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditUser;
