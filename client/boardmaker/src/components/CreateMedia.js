import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/media';

function CreateMedia() {
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [board_id, setBoard_id] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMedia = {
      name,
      src,
      board_id,
    };

    try {
      const response = await axios.post(API_URL, { media: newMedia });
      setMessage(`Media created successfully: ${response.data.name}`);
      setName('');
      setSrc('');
      setBoard_id('');
    } catch (error) {
      setMessage('Error creating Board');
    }
  };

  return (
    <div>
      <h2>Create New Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>src:</label>
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            required
          />
        </div>
        <div>
          <label>belongs to board:</label>
          <input
            type="number"
            value={board_id}
            onChange={(e) => setBoard_id(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Media</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateMedia;
