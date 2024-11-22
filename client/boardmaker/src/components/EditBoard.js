import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For route params (line 8)

const API_URL = 'http://localhost:3000/api/v1/boards'; // Updated to boards API

function EditBoard() {
  const { id } = useParams(); // Get the board id from the URL
  const [title, setTitle] = useState('');  // Renamed name to title
  const [desc, setDesc] = useState('');    // Renamed description to desc
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch board data based on ID from URL
    const fetchBoard = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        setTitle(data.title);  // Now setting title instead of name
        setDesc(data.desc);    // Now setting desc instead of description
      } catch (error) {
        setMessage('Error fetching board data');
      }
    };

    fetchBoard();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBoard = {
      title,
      desc,
    };

    try {
      const response = await axios.patch(`${API_URL}/${id}`, { board: updatedBoard });
      setMessage(`Board updated successfully: ${response.data.title}`);
    } catch (error) {
      setMessage('Error updating board');
    }
  };

  return (
    <div>
      <h2>Edit Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Board Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Board</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditBoard;
