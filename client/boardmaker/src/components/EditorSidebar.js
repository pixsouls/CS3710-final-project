import '../css/sidebar.scss';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/media';

function EditorSidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [name, setName] = useState('');
    const [src, setSrc] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchMedia = async () => {
                try {
                    const { data } = await axios.get(`${API_URL}/${id}`);
                    setName(data.name);
                    setSrc(data.src);
                } catch (error) {
                    setMessage('Error fetching media data');
                }
            };

            fetchMedia();
        }
    }, [id]);

    const handleUpdateMedia = async (e) => {
        e.preventDefault();

        const updatedMedia = {
            name,
            src,
        };

        try {
            const response = await axios.patch(`${API_URL}/${id}`, { media: updatedMedia });
            setMessage(`Media updated successfully: ${response.data.name}`);
        } catch (error) {
            setMessage('Error updating media');
        }
    };

    return (
        <Sidebar collapsed={collapsed} style={{ position: 'absolute', backgroundColor: '#f4f4f4', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            <Menu>
                <MenuItem onClick={() => setCollapsed(!collapsed)}>Toggle Sidebar</MenuItem>
                <MenuItem>Save</MenuItem>

                <SubMenu label="Edit Selected Media">
                    <MenuItem>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Media Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '20px',
                            }}
                        />
                    </MenuItem>
                    <MenuItem>
                        <label style={{ display: 'block', marginBottom: '10px' }}>Media Source (URL):</label>
                        <input
                            type="url"
                            value={src}
                            onChange={(e) => setSrc(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                marginBottom: '16px',
                            }}
                        />
                    </MenuItem>
                    <MenuItem>
                        <button
                            onClick={handleUpdateMedia}
                            style={{
                                padding: '8px 16px',
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
                    {message && (
                        <MenuItem>
                            <p style={{ color: 'green', marginTop: '12px' }}>{message}</p>
                        </MenuItem>
                    )}
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default EditorSidebar;
