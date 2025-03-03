import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ isLoggedIn, username, handleLogout, heritageSites }) {
    return (
        <nav>
            <ul>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/">Home</Link></li>
                        {heritageSites.map(site => (
                            <li key={site.id}><Link to={`/site/${site.id}`}>{site.name}</Link></li>
                        ))}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : null}
            </ul>
        </nav>
    );
}

export default Navigation;