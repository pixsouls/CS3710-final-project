import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/boards';

function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [user_id, setUser_id] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Optional: Loading state for the form

  // Fetch user data from localStorage (UID and token)
  const token = localStorage.getItem('access-token');
  const uid = localStorage.getItem('uid');

  useEffect(() => {
    if (!token || !uid) {
      // Redirect to login
      navigate('/login');
    } else {
      setUser_id(uid); // Set the user_id to the logged-in user's UID
    }
  }, [token, uid, navigate]);

  // Handle route navigation
  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !uid) {
      setMessage('You must be logged in to create a board.');
      return;
    }

    setLoading(true);
    
    const newBoard = {
      title,
      desc,
      user_id, // This will automatically be set to the user's ID
    };

    try {
      const response = await axios.post(API_URL, { board: newBoard }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setMessage(`Board created successfully: ${response.data.title}`);
      setTitle('');
      setDesc('');
      handleNavigate('/dashboard');
    } catch (error) {
      console.error('Error creating board:', error);
      setMessage('Error creating board');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create New Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Board'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateBoard;
