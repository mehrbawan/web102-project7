import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function EditCookie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cookie, setCookie] = useState({
        name: '',
        flavor: '',
        type: '',
        imgID: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCookie({ ...cookie, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('Cookies')
            .update(cookie)
            .eq('id', id);

        if (error) {
            setError(error.message);
        } else {
            navigate(`/cookie/${id}`); // Redirect to the cookie detail page
        }
    };

    if (loading) return <p>Loading cookie details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Edit Cookie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        name="name"
                        value={cookie.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Flavor:
                    <select
                        name="flavor"
                        value={cookie.flavor}
                        onChange={handleChange}
                        required>
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
                    <select type="text"
                        name="type"
                        value={cookie.type}
                        onChange={handleChange}
                        required>
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
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditCookie;
