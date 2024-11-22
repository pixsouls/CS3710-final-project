import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // For route params

const API_URL = 'http://localhost:3000/api/v1/media';

function EditMedia() {
  const { id } = useParams(); // Get the media id from the URL
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        setName(data.name);
        setSrc(data.src);
      } catch (error) {
        setMessage('Error fetching media data');
      }
    };

    fetchMedia();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMedia = {
      name,
      src,
    };

    try {
      const response = await axios.patch(`${API_URL}/${id}`, { media: updatedMedia });
      setMessage(`Media updated successfully: ${response.data.name}`);
    } catch (error) {
      setMessage('Error updating media');
    }
  };

  return (
    <div>
      <h2>Edit Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Media Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Media Source (URL):</label>
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Media</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditMedia;
