# Fullstack Chat App (Socket.io Learning Project)

This is a fullstack chat application built as a learning project to understand and implement real-time communication using [Socket.io](https://socket.io/). The project consists of a React frontend and a Node.js/Express backend, connected via Socket.io for instant messaging.

## Features
- Real-time chat between users
- User login (basic)
- List of online users
- Message history
- Simple and clean UI

## Technologies Used
- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Real-time:** Socket.io
- **Database:** MongoDB

## Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
1. **Clone the repository:**
   ```powershell
   git clone https://github.com/shubhamtalreja/Chat-app
   cd Chat-app
   ```
2. **Install dependencies:**
   - Frontend:
     ```powershell
     cd client
     npm install
     ```
   - Backend:
     ```powershell
     cd ../server
     npm install
     ```

### Running the App
1. **Start the backend server:**
   ```powershell
   npm run dev
   ```
2. **Start the frontend (in a separate terminal):**
   ```powershell
   cd client
   npm run dev
   ```
3. Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

## Project Structure
```
client/        # React frontend
server/        # Node.js/Express backend
```

## Learning Goals
- Understand how Socket.io enables real-time communication
- Practice integrating Socket.io with React and Express
- Learn about event-driven programming in JavaScript

## Credits
Created by Shubham Talreja as a learning project.

## License
This project is for educational purposes.
