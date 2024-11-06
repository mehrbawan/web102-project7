import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Gallery">Gallery</Link></li>
        <li><Link to="/Create">Create</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
