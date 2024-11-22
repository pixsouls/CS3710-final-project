import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/boards';
const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'client': localStorage.getItem('client'),
      'uid': localStorage.getItem('uid'),
    },
  });

function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    api.get('boards').then(response => {
      setBoards(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Boards</h2>
      <ul>
        {boards.map(board => (
          <li key={board.id}>{board.title}: {board.desc} (board's user id: {board.user_id})</li>
        ))}
      </ul>
    </div>
  );
}

export default Boards;
