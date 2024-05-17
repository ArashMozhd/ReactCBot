// Upload.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function Upload() {
    const location = useLocation();
    const { fullName } = location.state || {};

    return (
        <div>
            <h1>Welcome to the Upload Page, {fullName}!</h1>
            {/* Upload components or content */}
        </div>
    );
}

export default Upload;
