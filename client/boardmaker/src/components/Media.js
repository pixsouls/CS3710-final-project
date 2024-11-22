import { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const API_URL = 'http://localhost:3000/api/v1/media';

function Media() {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(response => {
      setMedia(response.data);
    });
  }, []);

  return (
    <div>
      <div><LogoutButton /></div>
      <h2>Media</h2>
      <ul>
        {media.map(media => (
          <li key={media.id}>{media.name}: {media.src}</li>
        ))}
      </ul>
    </div>
  );
}

export default Media;
