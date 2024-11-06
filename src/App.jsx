import React from 'react';
import Sidebar from './Sidebar';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CookieForm from './CookieForm';
import Home from './Home';
import CookieList from './CookieList';
import CookieDetail from './CookieDetail';
import EditCookie from './EditCookie';


function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="content">
          <img src="https://i.pinimg.com/originals/fd/29/1b/fd291b3de24daab38fcd2ea84bf0c022.png"></img>

          <h1>Cookie Run Cookie Maker</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<CookieList />} />
            <Route path="/create" element={<CookieForm />} />
            <Route path="/cookie/:id" element={<CookieDetail />} />
            <Route path="/edit-cookie/:id" element={<EditCookie />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
