import React, { useState, useEffect } from 'react';

function Profile() {
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        // Load badges from local storage
        const storedBadges = JSON.parse(localStorage.getItem('badges') || '[]');
        setBadges(storedBadges);
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            <h3>Earned Badges:</h3>
            <ul>
                {badges.map((badge, index) => (
                    <li key={index}>{badge}</li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;