import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const { fullName } = location.state || {};

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');
        // Redirect to the Auth page
        navigate('/auth');
    };

    return (
        <div>
            <h1>Welcome, {fullName}!</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Additional components or content */}
        </div>
    );
}

export default Home;
