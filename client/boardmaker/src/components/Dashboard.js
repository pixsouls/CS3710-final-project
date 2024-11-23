import '../css/dashboard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [boards, setBoards] = useState([]);

  // Fetch all boards on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/boards')
      .then(response => {
        setBoards(response.data);
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
  }, []);

  // Handle route navigation
  const handleNavigate = (route) => {
    navigate(route);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter boards based on search term
  const filteredBoards = boards.filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hello</h1>
      <h2>Actions</h2>
      <div>
        <button onClick={() => handleNavigate('/users')}>View All Users</button>
        <button onClick={() => handleNavigate('/boards')}>View All Boards</button>
        <button onClick={() => handleNavigate('/media')}>View All Media</button>
        <button onClick={() => handleNavigate('/board/create')}>Create Board</button>
      </div>

      <h3>Search for Boards</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search boards..."
      />

      <h2>Boards List</h2>

      {/* cards */}
      <div className="board-cards">
        {/* Add Board card */}
        <div className="board-card" onClick={() => handleNavigate('/board/create')}>
          <h3>Add Board</h3>
          <p className='description-text'>Click here to create a new board.</p>
        </div>

        
        {filteredBoards.length > 0 ? (
          filteredBoards.map(board => (
            <div
              className="board-card"
              key={board.id}
              onClick={() => handleNavigate('/editor/' + board.id)}
            >
              <h3>{board.title}</h3>
              <h4>{board.user_id}</h4>
              <p className='description-text'>{board.description || "No description available"}</p>
            </div>
          ))
        ) : (
          <div>No boards found</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
