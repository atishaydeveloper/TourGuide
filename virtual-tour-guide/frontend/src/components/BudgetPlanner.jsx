import React, { useState, useEffect } from 'react';

const BudgetPlanner = ({ location }) => {
  // Initial form state
  const [tripDetails, setTripDetails] = useState({
    duration: 1,
    accommodation: 'budget',
    transportation: 'public',
    dining: 'local',
    activities: [],
  });

  const [totalBudget, setTotalBudget] = useState(0);

  // Average costs per category (you can move these to a configuration file)
  const COSTS = {
    accommodation: {
      budget: 50,    // Per night in USD
      midrange: 100,
      luxury: 200
    },
    transportation: {
      public: 10,    // Per day
      rental: 40,
      private: 80
    },
    dining: {
      local: 20,     // Per day
      midrange: 40,
      fine: 80
    },
    activities: {
      'guided-tours': 30,
      'museum-visits': 15,
      'cultural-shows': 25,
      'handicraft-workshops': 40,
      'local-markets': 0
    }
  };

  // Calculate budget whenever trip details change
  useEffect(() => {
    calculateBudget();
  }, [tripDetails]);

  const calculateBudget = () => {
    const { duration, accommodation, transportation, dining, activities } = tripDetails;

    // Calculate costs for each category
    const accommodationCost = COSTS.accommodation[accommodation] * duration;
    const transportationCost = COSTS.transportation[transportation] * duration;
    const diningCost = COSTS.dining[dining] * duration;
    
    // Calculate activities cost
    const activitiesCost = activities.reduce((total, activity) => {
      return total + COSTS.activities[activity];
    }, 0);

    // Set total budget
    const total = accommodationCost + transportationCost + diningCost + activitiesCost;
    setTotalBudget(total);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleActivityToggle = (activity) => {
    setTripDetails(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  return (
    <div className="budget-planner">
      <h2>Trip Budget Planner</h2>
      <div className="budget-form">
        {/* Duration Input */}
        <div className="form-group">
          <label htmlFor="duration">Duration (days):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            value={tripDetails.duration}
            onChange={handleInputChange}
          />
        </div>

        {/* Accommodation Selection */}
        <div className="form-group">
          <label htmlFor="accommodation">Accommodation Type:</label>
          <select
            id="accommodation"
            name="accommodation"
            value={tripDetails.accommodation}
            onChange={handleInputChange}
          >
            <option value="budget">Budget (Hostels/Guesthouses)</option>
            <option value="midrange">Mid-Range Hotels</option>
            <option value="luxury">Luxury Hotels</option>
          </select>
        </div>

        {/* Transportation Selection */}
        <div className="form-group">
          <label htmlFor="transportation">Transportation Mode:</label>
          <select
            id="transportation"
            name="transportation"
            value={tripDetails.transportation}
            onChange={handleInputChange}
          >
            <option value="public">Public Transport</option>
            <option value="rental">Car Rental</option>
            <option value="private">Private Transport</option>
          </select>
        </div>

        {/* Dining Preferences */}
        <div className="form-group">
          <label htmlFor="dining">Dining Preference:</label>
          <select
            id="dining"
            name="dining"
            value={tripDetails.dining}
            onChange={handleInputChange}
          >
            <option value="local">Local Street Food</option>
            <option value="midrange">Mid-Range Restaurants</option>
            <option value="fine">Fine Dining</option>
          </select>
        </div>

        {/* Activities Selection */}
        <div className="form-group">
          <label>Activities:</label>
          <div className="activities-grid">
            {Object.entries(COSTS.activities).map(([activity, cost]) => (
              <div key={activity} className="activity-item">
                <input
                  type="checkbox"
                  id={activity}
                  checked={tripDetails.activities.includes(activity)}
                  onChange={() => handleActivityToggle(activity)}
                />
                <label htmlFor={activity}>
                  {activity.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} (${cost})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="budget-summary">
        <h3>Estimated Budget Summary</h3>
        <div className="budget-details">
          <p>Accommodation: ${COSTS.accommodation[tripDetails.accommodation] * tripDetails.duration}</p>
          <p>Transportation: ${COSTS.transportation[tripDetails.transportation] * tripDetails.duration}</p>
          <p>Dining: ${COSTS.dining[tripDetails.dining] * tripDetails.duration}</p>
          <p>Activities: ${tripDetails.activities.reduce((total, activity) => 
            total + COSTS.activities[activity], 0)}</p>
          <h4>Total Estimated Budget: ${totalBudget}</h4>
        </div>

        <div className="budget-tips">
          <h4>Money-Saving Tips:</h4>
          <ul>
            <li>Book accommodation in advance for better rates</li>
            <li>Use public transportation when possible</li>
            <li>Look for free walking tours and cultural activities</li>
            <li>Try local street food for authentic and affordable meals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
