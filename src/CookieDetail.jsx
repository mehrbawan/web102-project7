import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { supabase } from './supabaseClient';
import cookieImages from './cookieImages.json'; 

function CookieDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [cookie, setCookie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const flavorDescriptions = {
    "Sweet": "This cookie is as sweet as can be.",
    "Spicy": "This cookie packs the heat!",
    "Sour": "This cookie has a tangy, tart twist.",
    "Bitter": "This cookie has a bitter and dark demeanor.",
    "Umami": "A burst of rich flavor in every bite!",
    "Bland": "A cookie with a subtle, acquired taste."
  };

  const typeDescriptions = {
    "Bomber": "They pack an explosive punch.",
    "Charge": "They take the lead and power forward.",
    "Defense": "They protect their allies to the end.",
    "Magic": "They have a deep connection to the arcane.",
    "Ranged": "They take out enemies from a distance with great accuracy.",
    "Ambush": "They take out enemies with speed and surprise.",
    "Support": "They take the supportive role and assist their allies.",
    "Healing": "They keep their teammates healthy!"
  };

  useEffect(() => {
    const fetchCookieDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Cookies')
        .select('*')
        .eq('id', id)
        .single(); 

      if (error) {
        setError(error.message);
      } else {
        setCookie(data);
      }
      setLoading(false);
    };

    fetchCookieDetails();
  }, [id]);

  if (loading) return <p>Loading cookie details...</p>;
  if (error) return <p>Error: {error}</p>;

  let flavorText = '';
  if (cookie) {
    const flavorDesc = flavorDescriptions[cookie.flavor] || '';
    const typeDesc = typeDescriptions[cookie.type] || '';
    flavorText = `${flavorDesc} ${typeDesc}`;
  }

  const imageUrl = cookie ? cookieImages[cookie.flavor][cookie.imgID] : '';

  const handleDelete = async () => {
    const { error } = await supabase
      .from('Cookies')
      .delete()
      .eq('id', id);

    if (error) {
      setError('Error deleting the cookie: ' + error.message);
    } else {
      navigate('/gallery'); 
    }
  };

  const handleEdit = () => {
    navigate(`/edit-cookie/${id}`);
  };

  return (
    <div className="cookie-detail">
      {cookie ? (
        <div>
          <h2>{cookie.name}</h2>
          <p><strong>Flavor:</strong> {cookie.flavor}</p>
          <p><strong>Type:</strong> {cookie.type}</p>
          <img
            src={imageUrl}
            alt={`${cookie.name} cookie`}
            style={{ width: '200px', height: 'auto' }}
          />
          <p>{flavorText}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <p>Cookie not found!</p>
      )}
    </div>
  );
}

export default CookieDetail;
