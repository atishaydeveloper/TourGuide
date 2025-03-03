import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import HeritageSite from './components/HeritageSite';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import heritageSites from './data/heritageSites';  // Import data

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

                <Navigation
                    isLoggedIn={isLoggedIn}
                    username={username}
                    handleLogout={handleLogout}
                    heritageSites={heritageSites} // Pass the heritage sites data
                />

                <Routes>
                    <Route path="/" element={isLoggedIn ? <div>Welcome, {username}! Choose a heritage site.</div> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/site/:siteId" element={isLoggedIn ? <HeritageSite site={heritageSites.find(s => s.id === window.location.pathname.split('/')[2]) || {}} /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

            </div>
        </Router>
    );
}

export default App;