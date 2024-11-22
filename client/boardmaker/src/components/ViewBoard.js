import '../css/Editor.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  },
});

function ViewBoard() {
  const [board, setBoard] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [boardResponse, mediaResponse] = await Promise.all([
          api.get(`/boards/${id}`),
          api.get(`/boards/${id}/media`),
        ]);

        setBoard(boardResponse.data);
        setMedia(mediaResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found.</div>;
  }

  return (
    <div className="view-board">
      <h1>{board.name}</h1>
      <div className="dnd-container">
        {media.length > 0 ? (
          media.map((item) => (
            <div
              key={item.id}
              className="dnd-picture"
              style={{
                margin: '4px',
                background: '#ffffff122',
                borderRadius: '4px',
                padding: '4px',
                position: 'absolute',
                left: `${item.position.x}px`,
                top: `${item.position.y}px`,
              }}
            >
              <img
                src={item.src}
                alt={item.name}
                style={{ maxWidth: '300px' }}
              />
              <h3>{item.name}</h3>
            </div>
          ))
        ) : (
          <p>No media available for this board.</p>
        )}
      </div>
    </div>
  );
}

export default ViewBoard;
