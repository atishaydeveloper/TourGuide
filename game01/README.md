# Heritage Explorer - Gamification System

A web-based prototype that implements a gamification system for heritage site exploration. Users can earn badges by spending time learning about different heritage sites.

## Features

- **Login System**: Simple authentication system using local storage
- **Heritage Site Navigation**: Five major Indian heritage sites with detailed information
- **Time-Based Badge System**: Earn badges by spending 15 minutes on each heritage site
- **User Profile**: View earned badges and track progress
- **Active Time Tracking**: Intelligent system to track genuine user engagement

## Tech Stack

- React.js
- React Router for navigation
- Material-UI for styling
- Local Storage for data persistence

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

1. Log in with any username and password
2. Navigate between different heritage sites using the top navigation bar
3. Spend time reading about each site
4. Earn badges after 15 minutes of active engagement
5. View your earned badges in the profile section

## Note

This is a prototype version that uses local storage for data persistence. In a production environment, you would want to:
- Implement proper backend authentication
- Use a database for storing user data and badges
- Add more sophisticated activity tracking
- Include actual images and detailed content for each heritage site
