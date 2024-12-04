import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// General components
import Dashboard from './components/Dashboard';
import Welcome from './components/Welcome';
import Search from './components/Search';
import Users from './components/Users';
import Boards from './components/Boards';
import Media from './components/Media';
import Login from './components/Login';

// The editor
import Editor from './components/Editor';

// Board Viewer
import ViewBoard from './components/ViewBoard';

// User routes
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

// Board routes
import CreateBoard from './components/CreateBoard';
import EditBoard from './components/EditBoard';

// Media routes
import CreateMedia from './components/CreateMedia';
import EditMedia from './components/EditMedia';

function App() {
  const [token, setToken] = useState(null);  // Store token state
  const [loading, setLoading] = useState(true); // For initial loading state

  // Check if token exists on app mount
  useEffect(() => {
    const savedToken = localStorage.getItem('access-token');
    if (savedToken) {
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  // Handle login
  const login = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;  // Redirect to login if not authenticated
    }
    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard logout={logout} />
              </ProtectedRoute>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/media" element={<Media />} />
          <Route path="/search" element={<Search />} />

          {/* Login Route */}
          <Route
            path="/login"
            element={<Login login={login} />}
          />

          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/viewboard/:id" element={<ViewBoard />} />

          {/* User Routes (MOSTLY FOR DEBUGGING) */}
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />

          {/* Board Routes (MOSTLY FOR DEBUGGING) */}
          <Route path="/board/create" element={<CreateBoard />} />
          <Route path="/board/edit/:id" element={<EditBoard />} />

          {/* Media Routes (MOSTLY FOR DEBUGGING) */}
          <Route path="/media/create" element={<CreateMedia />} />
          <Route path="/media/edit/:id" element={<EditMedia />} />

          <Route path="/" element={<Navigate to="/welcome" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
