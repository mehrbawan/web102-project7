import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import cookieImages from './cookieImages.json'; 

function CookieForm() {
    const [name, setName] = useState('');
    const [flavor, setFlavor] = useState('Sweet');
    const [type, setType] = useState('Magic');
    const [message, setMessage] = useState('');

    const getRandomImageID = (flavor) => {
        const images = cookieImages[flavor];
        if (images && images.length > 0) {
            const randomIndex = Math.floor(Math.random() * images.length);
            return randomIndex; 
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imgID = getRandomImageID(flavor);

        const { data, error } = await supabase
            .from('Cookies')
            .insert([{ name, flavor, type, imgID }]);

        if (error) {
            setMessage('Error adding cookie: ' + error.message);
        } else {
            setMessage('Cookie added successfully!');
            setName('');
            setFlavor('');
            setType('');
        }
    };


  return (
    <div className = "cookie-form">
      <h2>Add a Cookie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        
        <label>
          Flavor:
          <select value={flavor} onChange={(e) => setFlavor(e.target.value)} required>
            <option value="Sweet">Sweet</option>
            <option value="Spicy">Spicy</option>
            <option value="Sour">Sour</option>
            <option value="Bitter">Bitter</option>
            <option value="Umami">Umami</option>
            <option value="Bland">Bland</option>
          </select>
        </label>
        <br />
        
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="Magic">Magic</option>
            <option value="Charge">Charge</option>
            <option value="Defense">Defense</option>
            <option value="Support">Support</option>
            <option value="Bomber">Bomber</option>
            <option value="Ambush">Ambush</option>
            <option value="Healing">Healing</option>
            <option value="Ranged">Ranged</option>
          </select>
        </label>
        <br />
        
        <button type="submit">Add Cookie</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CookieForm;
