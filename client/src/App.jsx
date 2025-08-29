import { useState } from 'react'
import './App.css'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  )
}

export default App
