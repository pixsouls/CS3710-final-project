import '../css/Editor.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Draggable from 'react-draggable';
import EditMediaCard from './EditMediaCard';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {ReactComponent as SaveIcon} from '../icons/save.svg'
import {ReactComponent as AddIcon} from '../icons/add.svg'
import {ReactComponent as EditIcon} from '../icons/edit.svg'
import {ReactComponent as MenuIcon} from '../icons/menu.svg'
import {ReactComponent as ShareIcon} from '../icons/share.svg'
import {ReactComponent as BackIcon} from '../icons/back.svg'



const API_URL = 'http://localhost:3000/api/v1/';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  },
});

function Editor() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(null); // Start with null to indicate no data
  const [media, setMedia] = useState([]);
  const [focusedMedia, setFocusedMedia] = useState(null); // Track the selected media
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState('');
  const [src, setSrc] = useState('');
  const [newMediaName, setNewMediaName] = useState('');
  const [newMediaSrc, setNewMediaSrc] = useState('');
  const [message, setMessage] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  const [positions, setPositions] = useState({}); // Track positions
  const [loading, setLoading] = useState(true); // Loading state, for the loading... message
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

  const handleNavigate = (route) => {
    navigate(route);
  };

  const handleDragStop = (e, data, mediaId) => {
    setPositions((prev) => ({
      ...prev,
      [mediaId]: { x: data.x, y: data.y },
    }));
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const save = async () => {
    try {
      for (const [mediaId, position] of Object.entries(positions)) {
        const updatedMedia = {
          position,
        };

        await api.patch(`/media/${mediaId}`, { media: updatedMedia });
      }

      setSaveMessage('All media saved successfully.');
    } catch (error) {
      console.error('Error saving media:', error);
      setMessage('Error updating media.');
    }
  };
    

  const mediaDraggedEvent = (e, mediaId) => {
    // Remove the "selected" class from all elements
    media.forEach((item) => {
      const element = document.getElementById("MediaID" + item.id);
      if (element) {
        element.classList.remove('selected');
      }
    });
  
    // Add the "selected" class to the currently dragged element by ID
    const currentElement = document.getElementById(mediaId);
    if (currentElement) {
      currentElement.classList.add('selected');
    }
  
    // Update the focused media state
    const selectedMedia = media.find((item) => item.id === mediaId);
    if (selectedMedia) {
      setFocusedMedia(selectedMedia);
      setName(selectedMedia.name);
      setSrc(selectedMedia.src);
      setSaveMessage('* Changed unsaved');
    }
  };
  

  const handleUpdateMedia = async (e) => {
    e.preventDefault();

    const updatedMedia = {
        name,
        src,
    };

    try {
        const response = await axios.patch(`${API_URL}media/${focusedMedia.id}`, { media: updatedMedia });
        setMessage(`Media updated successfully: ${response.data.name}`);
    } catch (error) {
        setMessage('Error updating media');
    }
  };

  const handleAddMedia = async (e) => {
    e.preventDefault();
    save()
    const addMedia = {
        name : newMediaName,
        src : newMediaSrc,
        board_id : id
    };

    try {
        const response = await axios.post(`${API_URL}media/`, { media: addMedia });
        setMessage(`Media updated successfully: ${response.data.name}`);
        setName('');
        setSrc('');
        save()
        window.location.reload(false);
    } catch (error) {
        setMessage('Error updating media');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found.</div>;
  }

  return (
    <div className="editor">
      <Sidebar  collapsed={collapsed} 
                className='sidebar'
                >
      <Menu>
        {collapsed ? (
          <MenuItem icon={<MenuIcon/>} onClick={() => toggleCollapsed(true)}/>
          ) : (
          <MenuItem icon={<BackIcon/>} onClick={() => toggleCollapsed(true)}>
            Actions Menu
          </MenuItem>
          )}
          {collapsed ? ( 
            <MenuItem onClick={save} icon={<SaveIcon/>} />
            ) : (
            <MenuItem onClick={save} icon={<SaveIcon/>}>  
              Save 
            </MenuItem>
          )}
        <SubMenu label="Add" icon={<AddIcon />} SubMenuExpandIcon={<MenuIcon />}>
          {collapsed ? (
            <></>
          ) : (
            <>
              <MenuItem>
                <label style={{ display: 'block', margin: '12px' }}>Media Name:</label>
              </MenuItem>
              <MenuItem>
                <input
                  type="text"
                  value={newMediaName}
                  onChange={(e) => setNewMediaName(e.target.value)}
                  required
                  style={{
                    width: 'fit-content',
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    margin: '12px',
                    color: '#000000',
                  }}
                />
              </MenuItem>
              <MenuItem>
                <label style={{ display: 'block', margin: '12px' }}>Media Source:</label>
              </MenuItem>
              <MenuItem>
                <input
                  type="text"
                  value={newMediaSrc}
                  onChange={(e) => setNewMediaSrc(e.target.value)}
                  required
                  style={{
                    width: 'fit-content',
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    margin: '12px',
                    color: '#000000',
                  }}
                />
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleAddMedia}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Add Media
                </button>
              </MenuItem>
            </>
          )}
        </SubMenu>

        <SubMenu label="Edit Selected Media" icon={<EditIcon />}>
          {focusedMedia && !collapsed ? (
            <>
              <MenuItem>
                <label style={{ display: 'block', margin: '12px' }}>Media Name:</label>
              </MenuItem>
              <MenuItem>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: 'fit-content',
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    margin: '12px',
                    color: '#000000',
                  }}
                />
              </MenuItem>
              <MenuItem>
                <label style={{ display: 'block', margin: '12px' }}>Media Source (URL):</label>
              </MenuItem>
              <MenuItem>
                <input
                  type="url"
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                  required
                  style={{
                    width: 'fit-content',
                    padding: '4px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    margin: '12px',
                    color: '#000000',
                  }}
                />
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleUpdateMedia}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Update Media
                </button>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <p
                style={{
                  Color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                No media selected
              </p>
            </MenuItem>
          )}
          {message && (
            <MenuItem>
              <p style={{ color: 'green', margin: '12px', position: 'relative'}}>{message}</p>
            </MenuItem>
          )}
        </SubMenu>
              {collapsed ? (
                <MenuItem icon={ <ShareIcon />}></MenuItem>
                ) : (
                  <>
                  <MenuItem icon={ <ShareIcon />}>
                    <button 
                    style={{
                      padding: '8px',
                      backgroundColor: '#007BFF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() =>  navigator.clipboard.writeText('http://localhost:3001/viewboard/' + String(id))}>Get Share Link</button>
                    </MenuItem>
                  </>
              )}
              {collapsed ? (
              <MenuItem icon={ <BackIcon /> }>
              </MenuItem>
              
              ) : (
                <MenuItem icon={ <BackIcon /> }>
                <button 
                  onClick={() => handleNavigate('/dashboard')}
                  style={{
                    padding: '8px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}>
                    Back to Dashboard
                  </button>
              </MenuItem>
              )}
              
            </Menu>
        </Sidebar>
      <div className='dnd-container'>
        <p>{saveMessage}</p>
        {media.length > 0 ? (
          media.map((item) => (
            <Draggable
              id={'MediaID' + item.id}
              key={item.id}
              defaultPosition={{ x: item.position['x'], y: item.position['y'] }}
              bounds={{ left: 0, top: 0 }}
              onStart={(e, data) => mediaDraggedEvent(e, item.id)}
              onStop={(e, data) => handleDragStop(e, data, item.id)}
            >
              <div
                className="dnd-picture"
                style={{
                  margin: '4px',
                  background: '#ffffff122',
                  borderRadius: '4px',
                  padding: '4px',
                }}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  draggable="false"
                  style={{ maxWidth: '300px' }}
                />
                <h3>{item.name}</h3>
              </div>
            </Draggable>
          ))
        ) : (
          <p>No media available for this board.</p>
        )}
      </div>
    </div>
  );
}

export default Editor;