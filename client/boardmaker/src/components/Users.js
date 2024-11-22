import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/users';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(response => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
