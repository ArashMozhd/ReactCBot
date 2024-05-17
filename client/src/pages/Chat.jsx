// Chat.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

function Chat() {
    const location = useLocation();
    const { fullName } = location.state || {};

    return (
        <div>
            <h1>Welcome to the Chat, {fullName}!</h1>
            {/* Chat components or content */}
        </div>
    );
}

export default Chat;
