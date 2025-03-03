import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';

// --- Dummy Data ---
const heritageSites = [
    { id: 'taj-mahal', name: 'Taj Mahal', description: 'An ivory-white marble mausoleum...' },
    { id: 'ellora-caves', name: 'Ellora Caves', description: 'One of the largest rock-cut monastery-temple cave complexes...' },
    { id: 'hampi', name: 'Hampi', description: 'A UNESCO World Heritage Site in Karnataka...' },
    { id: 'red-fort', name: 'Red Fort', description: 'A historical fort in Delhi...' },
    { id: 'qutub-minar', name: 'Qutub Minar', description: 'A minaret and "victory tower" that forms a part of the Qutb complex...' },
];


// --- Authentication Component ---
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation (replace with proper authentication)
        if (username === 'user' && password === 'password') {
            onLogin(username);
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// --- Heritage Site Component ---
function HeritageSite({ site }) {
    const [timeSpent, setTimeSpent] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [badgeEarned, setBadgeEarned] = useState(false);
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        let intervalId;

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (isActive) {
            intervalId = setInterval(() => {
                setTimeSpent((prevTime) => prevTime + 1); // Increment every second
            }, 1000);
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


// --- User Profile Component ---
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

// --- Main App Component ---
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);


    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUsername(user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername(null);
    };

    return (
        <Router>
            <div>
                <h1>Heritage Site Gamification</h1>

                {isLoggedIn ? (
                    <>
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                {heritageSites.map(site => (
                                    <li key={site.id}><Link to={`/site/${site.id}`}>{site.name}</Link></li>
                                ))}
                                <li><Link to="/profile">Profile</Link></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </nav>

                        <Routes>
                            <Route path="/" element={<div>Welcome, {username}! Choose a heritage site.</div>} />
                            <Route path="/site/:siteId" element={<HeritageSite site={heritageSites.find(s => s.id === window.location.pathname.split('/')[2]) || {}} />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
            </div>
        </Router>
    );
}

export default App;