import React, { useState, useEffect } from 'react';

function HeritageSite({ site }) {
    const [timeSpent, setTimeSpent] = useState(0);
    const [isActive, setIsActive] = useState(true); // Start active by default
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        let intervalId;

        const handleVisibilityChange = () => {
            setIsActive(document.visibilityState === 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (isActive) {
            intervalId = setInterval(() => {
                setTimeSpent((prevTime) => prevTime + 1); // Increment every second
            }, 1000);
        } else {
            clearInterval(intervalId); // Clear interval when inactive.
        }

        // Check if badge should be earned
        if (timeSpent >= 900 && !badgeEarned) { // 900 seconds = 15 minutes
            setBadgeEarned(true);
        }

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isActive, timeSpent, badgeEarned]);

    useEffect(() => {
        if (badgeEarned && !alertShown) {
            alert(`Congratulations! You've earned a badge for ${site.name}!`);
            setAlertShown(true);

            // Save badge to local storage (or backend later)
            const badges = JSON.parse(localStorage.getItem('badges') || '[]');
            const newBadges = [...badges, site.name];
            localStorage.setItem('badges', JSON.stringify(newBadges));
        }
    }, [badgeEarned, site.name, alertShown]);


    return (
        <div>
            <h2>{site.name}</h2>
            <p>{site.description}</p>
            <p>Time spent on this page: {Math.floor(timeSpent / 60)} minutes {timeSpent % 60} seconds</p>
        </div>
    );
}

export default HeritageSite;