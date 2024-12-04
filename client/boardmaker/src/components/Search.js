// src/components/Search.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Perform the search when user submits the search form
  const handleSearch = () => {
    setLoading(true);
    const token = localStorage.getItem('access-token');
    
    if (token) {
      axios
        .get('http://localhost:3000/api/v1/boards/search', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          params: {
            string: searchTerm, 
          },
        })
        .then((response) => {
          setBoards(response.data); 
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error searching boards:', error);
          setLoading(false);
        });
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Boards</h1>

      {/* Search form */}
      <div style={{overflow: 'visible'}}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for boards..."
        />
        <button onClick={handleSearch} style={{
            fontSize: '16px',
            padding: '12px',
            backgroundColor: '#6e118d',
        }}>Search</button>
      </div>

      {/* Display search results */}
      <h2>Search Results</h2>
      <div className="board-cards">
        {/* Render boards if there are results */}
        {boards.length > 0 ? (
          boards.map((board) => (
            <div className="board-card" key={board.id}>
              <h3>{board.title}</h3>
              <h4>Owner ID: {board.user_id}</h4>
              <p>{board.desc || 'No description available'}</p>
              <button onClick={() => handleNavigate(`/viewboard/${board.id}`)}>Show Board</button>
            </div>
          ))
        ) : (
          <div>No boards found matching your search.</div> // If no boards found
        )}
      </div>
    </div>
  );
}

export default Search;