import React from 'react'
import './UserList.css';

const UserList = ({ roomUsers }) => {

    return (
        <div className="user-list">
            <h3>Users Online</h3>
            <ul>
                {roomUsers?.map((user, index) => (
                    <li key={index}>{user.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList
