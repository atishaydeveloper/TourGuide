import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recommendations = ({ siteCoordinates }) => {
  const [recommendations, setRecommendations] = useState({
    hotels: [],
    restaurants: [],
    attractions: []
  });
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    rating: 0,
    distance: 5000 // meters
  });
  const [loading, setLoading] = useState(false);

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = async () => {
    if (!siteCoordinates) return;
    
    setLoading(true);
    try {
      // You'll need to set up a proxy or backend endpoint to make these API calls
      const response = await axios.get(`/api/nearby-places`, {
        params: {
          lat: siteCoordinates.lat,
          lng: siteCoordinates.lng,
          radius: filters.distance,
          type: filters.type
        }
      });

      // Transform and categorize the data
      const categorizedPlaces = {
        hotels: response.data.filter(place => place.types.includes('lodging')),
        restaurants: response.data.filter(place => place.types.includes('restaurant')),
        attractions: response.data.filter(place => 
          place.types.includes('tourist_attraction') || 
          place.types.includes('point_of_interest')
        )
      };

      setRecommendations(categorizedPlaces);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter recommendations based on user selections
  const getFilteredRecommendations = () => {
    let filtered = { ...recommendations };

    Object.keys(filtered).forEach(category => {
      filtered[category] = filtered[category].filter(place => {
        const meetsRating = place.rating >= filters.rating;
        const meetsPriceRange = filters.priceRange === 'all' || 
          place.price_level === parseInt(filters.priceRange);
        return meetsRating && meetsPriceRange;
      });
    });

    return filtered;
  };

  useEffect(() => {
    fetchNearbyPlaces();
  }, [siteCoordinates, filters.distance]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const filteredRecommendations = getFilteredRecommendations();

  return (
    <div className="recommendations-container">
      <div className="filters-section">
        <h2>Nearby Recommendations</h2>
        
        {/* Filter Controls */}
        <div className="filters">
          <select 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="hotels">Hotels</option>
            <option value="restaurants">Restaurants</option>
            <option value="attractions">Attractions</option>
          </select>

          <select 
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>

          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.5"
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
          />
          <span>Min Rating: {filters.rating}</span>

          <select 
            value={filters.distance}
            onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
          >
            <option value="1000">1 km</option>
            <option value="2000">2 km</option>
            <option value="5000">5 km</option>
            <option value="10000">10 km</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div>Loading recommendations...</div>
      ) : (
        <div className="recommendations-grid">
          {Object.entries(filteredRecommendations).map(([category, places]) => (
            <div key={category} className="category-section">
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <div className="places-grid">
                {places.map(place => (
                  <div key={place.place_id} className="place-card">
                    {place.photos?.[0] && (
                      <img 
                        src={place.photos[0].getUrl()} 
                        alt={place.name} 
                      />
                    )}
                    <h4>{place.name}</h4>
                    <div className="place-details">
                      <span>Rating: {place.rating} ⭐</span>
                      <span>Price: {'$'.repeat(place.price_level || 1)}</span>
                    </div>
                    <p>{place.vicinity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
