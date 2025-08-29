import React from 'react'
import './UserList.css';

const UserList = () => {
    const users = ['Alice', 'Bob', 'Charlie', 'You'];
    return (
        <div className="user-list">
            <h3>Users Online</h3>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList
