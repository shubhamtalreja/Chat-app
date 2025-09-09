import React from 'react'
import './UserList.css';

const UserList = ({ roomUsers, onUserSelect }) => {
    const handleUserClick = (user) => {
        onUserSelect(user);
    };
    return (
        <div className="user-list">
            <h3>Users Online</h3>
            <ul>
                {roomUsers?.map((user, index) => (
                    <li key={index}>
                        <button className="user-button" onClick={() => handleUserClick(user)}>
                            {user.username}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList
