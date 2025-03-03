import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Profile from './components/Profile';
import HeritageSite from './components/HeritageSite';
import Accommodation from './components/Accommodation';
import Artifacts from './components/Artifacts';
import TourGuide from './components/TourGuide';
import About from './components/About';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              <Navigate to="/heritage-sites/taj-mahal" /> : 
              <Login onLoginSuccess={handleLoginSuccess} />
          } 
        />
        
        <Route
          path="/heritage-sites/:siteId"
          element={
            <PrivateRoute>
              <HeritageSite />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/accommodation"
          element={
            <PrivateRoute>
              <Accommodation />
            </PrivateRoute>
          }
        />

        <Route
          path="/artifacts"
          element={
            <PrivateRoute>
              <Artifacts />
            </PrivateRoute>
          }
        />

        <Route
          path="/tour-guide"
          element={
            <PrivateRoute>
              <TourGuide />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/heritage-sites/taj-mahal" : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
