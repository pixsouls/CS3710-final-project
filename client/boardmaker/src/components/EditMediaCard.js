import '../css/EditMediaCard.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/media';

function EditMediaCard({ id, initialName = '', initialSrc = '' }) {
  const [name, setName] = useState(initialName);
  const [src, setSrc] = useState(initialSrc);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id && (!initialName || !initialSrc)) {
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
    }
  }, [id, initialName, initialSrc]);

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
    <div className='fade-in edit-media-card' style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', width: '300px' }}>
      <h3>Edit Media</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Media Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>Media Source (URL):</label>
          <input
            type="url"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Update Media
        </button>
      </form>
      {message && <p style={{ marginTop: '12px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default EditMediaCard;
