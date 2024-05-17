import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import Upload from './pages/Upload';
import About from './pages/About';
// import Home from './pages/Home';
import Auth from './pages/Auth'; // Import the new Auth component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} /> {/* Add route for Auth */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
