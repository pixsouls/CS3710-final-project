import '../css/dashboard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [boards, setBoards] = useState([]);  // boards is initially an empty array
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch all boards on component mount
  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');

    if (token && uid) {
      // Fetch user details using the UID
      axios.get(`http://localhost:3000/api/v1/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}` // Send token in Authorization header
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });

      // Fetch boards for the current user
      axios.get(`http://localhost:3000/api/v1/boards/search?user_id=${uid}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Send token in Authorization header
        }
      })
      .then(response => {
        setBoards(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
        setLoading(false); // Set loading to false if there's an error
      });
    }
  }, []);

  // Handle route navigation
  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = (boards || []).filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <h1>Hello {user ? user.name : 'Loading...'}</h1>
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

        {/* Only render the boards section if there are boards */}
        {boards && boards.length > 0 ? (
          // Only render filtered boards if there are results
          filteredBoards.length > 0 ? (
            filteredBoards.map(board => (
              <div
                className="board-card"
                key={board.id}
                onClick={() => handleNavigate('/editor/' + board.id)}
              >
                <h3>{board.title}</h3>
                <h4>{board.user_id}</h4>
                <p className='description-text'>{board.desc || "No description available"}</p>
              </div>
            ))
          ) : (
            <div>No boards found matching your search.</div>  // Show message when no boards match the search term
          )
        ) : (
          <div>No boards available</div>  // Show message if no boards are fetched from API
        )}
      </div>
    </div>
  );
}

export default Dashboard;
