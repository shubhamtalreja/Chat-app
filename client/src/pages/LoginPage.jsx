import React from 'react'
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = React.useState('');
    const [room, setRoom] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() && room.trim()) {
            socket.emit('joinRoom', {username, room});
            navigate('/chat');
        } else {
            console.log('Username and room are required.');
        }
    }

    return (
        <div className="login-page">
            <div className="login-form-container">
                <h2>Join a Chat Room</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter your username..."
                            onChange={(e) => setUsername(e.target.value)}
                            required // A simple HTML5 validation to ensure the field isn't empty.
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="room">Room</label>
                        <input
                            type="text"
                            id="room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            placeholder="Enter the room name..."
                            required
                        />
                    </div>
                    <button type="submit">Join Room</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage
