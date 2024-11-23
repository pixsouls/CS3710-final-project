import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/boards';

function CreateBoard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [user_id, setUser_id] = useState('');
  const [message, setMessage] = useState('');

    // Handle route navigation
  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBoard = {
      title,
      desc,
      user_id,
    };

    try {
      const response = await axios.post(API_URL, { board: newBoard });
      setMessage(`Board created successfully: ${response.data.name}`);
      setTitle('');
      setDesc('');
      setUser_id('');
      handleNavigate('/dashboard')
    } catch (error) {
      setMessage('Error creating Board');
    }
  };

  return (
    <div>
      <h2>Create New Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>description:</label>
          <input
            type="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div>
          <label>belongs to user:</label>
          <input
            type="user_id"
            value={user_id}
            onChange={(e) => setUser_id(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Board</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateBoard;
