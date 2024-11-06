import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';
import CookieCard from './CookieCard.jsx';

function CookieList() {
  const [cookies, setCookies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCookies = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('Cookies')
        .select('*');

      if (error) {
        setError(error.message);
      } else {
        setCookies(data);
      }
      setLoading(false);
    };

    fetchCookies();
  }, []);

  if (loading) return <p>Loading cookies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Cookie List</h2>
      <div className="cookie-list">
        {cookies.map((cookie) => (
          <CookieCard
            key={cookie.id}
            id={cookie.id}
            name={cookie.name}
            flavor={cookie.flavor}
            type={cookie.type}
            imgID={cookie.imgID} 
          />
        ))}
      </div>
    </div>
  );
}

export default CookieList;
