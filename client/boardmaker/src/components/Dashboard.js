import '../css/dashboard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [boards, setBoards] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');

    if (token && uid) {
      axios.get(`http://localhost:3000/api/v1/users/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });

      axios.get(`http://localhost:3000/api/v1/boards/search?user_id=${uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setBoards(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
        setLoading(false);
      });
    }
  }, []);

  const handleNavigate = (route) => {
    navigate(route);
  };

  const DeleteBoard = (boardID) => {
    let token = localStorage.getItem('access-token');
    let uid = localStorage.getItem('uid');
    if (token && uid) {
      if (!window.confirm("Do you really want to delete this board?")) {
        return;
      }
      
      axios.delete(`http://localhost:3000/api/v1/boards/${boardID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setLoading(false); 
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting board:', error);
        setLoading(false);
      });
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBoards = (boards || []).filter(board =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hello {user ? user.name : 'Loading...'}</h1>
      <h2>Actions</h2>
      <div style={{
        overflow: 'visible',
      }}>
        <button 
          onClick={() => handleNavigate('/search')} 
          aria-label="Go to search boards page"
        >
          Search Boards
        </button>
        <button 
          onClick={() => handleNavigate('/board/create')} 
          aria-label="Go to create board page"
        >
          Create Board
        </button>
      </div>

      <h3>Search My Boards</h3>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search boards..."
        aria-label="Search boards by title"
      />

      <h2>Boards List</h2>

      <div className="board-cards">
        <div className="board-card" onClick={() => handleNavigate('/board/create')}>
          <h3>
            Add New Board
          </h3>
          <div className='description-text'>
            Click here to create a new board.
          </div>
        </div>

        {boards && boards.length > 0 ? (
          filteredBoards.length > 0 ? (
            filteredBoards.map(board => (
              <>
                <div
                  className="board-card"
                  key={board.id}
                  aria-labelledby={`board-${board.id}-title`}
                >
                  <h3 id={`board-${board.id}-title`}>{board.title}</h3>
                  <h4>{board.user_id}</h4>
                  <div className='description-text'>{board.desc || "No description available"}</div>
                  <button
                    onClick={() => handleNavigate('/editor/' + board.id)}
                    style={{
                      backgroundColor: '#6f118e',
                      color: '#fff',
                      marginTop: 'auto',
                      padding: '12px',
                      fontSize: '24px',
                      fontFamily: 'Inter',
                    }}
                    aria-label={`Edit board ${board.title}`}
                  >
                    Show Board
                  </button>
                  <button
                    onClick={() => DeleteBoard(board.id)}
                    style={{
                      backgroundColor: '#e94457',
                      margin: '12px',
                      marginBottom: '6px',
                      padding: '6px',
                      paddingBottom: '12px',
                      color: '#dfe6fb',
                      fontSize: '16px',
                      fontFamily: 'Inter',
                      borderStyle: 'hidden',
                    }}
                    aria-label={`Delete board ${board.title}`}
                  >
                    Delete
                  </button>
                </div>
              </>
            ))
          ) : (
            <div>No boards found matching your search.</div>
          )
        ) : (
          <div>No boards available</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
