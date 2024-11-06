import React, { useEffect, useState } from 'react';
import cookieImages from './cookieImages.json'; 
import { Link } from 'react-router-dom'; 


function CookieCard({ id, name, flavor, type, imgID }) {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        if (flavor && imgID !== undefined) {
            const images = cookieImages[flavor];
            if (images && images.length > 0 && imgID >= 0 && imgID < images.length) {
                setImageUrl(images[imgID]); 
            }
        }
    }, [flavor, imgID]);

    return (
        <div className="cookie-card">
            <h3>{name}</h3>
            <p><strong>Flavor:</strong> {flavor}</p>
            <p><strong>Type:</strong> {type}</p>

            <Link to={`/cookie/${id}`} className="cookie-link">{imageUrl ? (
                <img src={imageUrl} alt={`${flavor} cookie`} style={{ width: '150px', height: 'auto' }} />
            ) : (
                <p>No image available for this flavor.</p>
            )}</Link>
        </div>
    );
}

export default CookieCard;
