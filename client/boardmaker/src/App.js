import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// general components
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Boards from './components/Boards';
import Media from './components/Media';
import Login from './components/Login';

// THE editor
import Editor from './components/Editor';

// Board Viewer
import ViewBoard from './components/ViewBoard';

// user routes
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

//board routes
import CreateBoard from './components/CreateBoard';
import EditBoard from './components/EditBoard';

// media routes
import CreateMedia from './components/CreateMedia';
import EditMedia from './components/EditMedia';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/media" element={<Media />} />
          <Route path="/login" element={<Login />} />

          <Route path="/editor/:id" element={<Editor />} />

          <Route path="/viewboard/:id" element={<ViewBoard />} />

          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          
          <Route path="/board/create" element={<CreateBoard />} />
          <Route path="/board/edit/:id" element={<EditBoard />} />

          <Route path="/media/create" element={<CreateMedia />} />
          <Route path="/media/edit/:id" element={<EditMedia />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
