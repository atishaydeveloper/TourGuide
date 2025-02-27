import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocalEvents = ({ location }) => {
  const [events, setEvents] = useState([]);
  const [handicrafts, setHandicrafts] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Fetch events and handicrafts data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch events
        const eventsResponse = await axios.get(`/api/events`, {
          params: { location, month: selectedMonth }
        });
        setEvents(eventsResponse.data);

        // Fetch handicrafts
        const handicraftsResponse = await axios.get(`/api/handicrafts`, {
          params: { location }
        });
        setHandicrafts(handicraftsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, selectedMonth]);

  // Cart management
  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCart(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Group events by date
  const groupEventsByDate = () => {
    return events.reduce((groups, event) => {
      const date = new Date(event.date).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {});
  };

  return (
    <div className="local-events-container">
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={activeTab === 'events' ? 'active' : ''} 
          onClick={() => setActiveTab('events')}
        >
          Local Events
        </button>
        <button 
          className={activeTab === 'handicrafts' ? 'active' : ''} 
          onClick={() => setActiveTab('handicrafts')}
        >
          Local Handicrafts
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="content">
          {activeTab === 'events' ? (
            <div className="events-section">
              <h2>Local Events & Festivals</h2>
              
              {/* Month selector */}
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="month-selector"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>

              {/* Events Calendar */}
              <div className="events-calendar">
                {Object.entries(groupEventsByDate()).map(([date, dayEvents]) => (
                  <div key={date} className="event-day">
                    <h3>{date}</h3>
                    {dayEvents.map(event => (
                      <div key={event.id} className="event-card">
                        {event.image && (
                          <img src={event.image} alt={event.name} />
                        )}
                        <div className="event-details">
                          <h4>{event.name}</h4>
                          <p className="event-time">{event.time}</p>
                          <p className="event-location">{event.venue}</p>
                          <p className="event-description">{event.description}</p>
                          {event.ticketPrice && (
                            <p className="event-price">
                              Ticket Price: ${event.ticketPrice}
                            </p>
                          )}
                          <a 
                            href={event.bookingLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="book-button"
                          >
                            Book Tickets
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="handicrafts-section">
              <h2>Local Handicrafts</h2>
              
              {/* Handicrafts Grid */}
              <div className="handicrafts-grid">
                {handicrafts.map(craft => (
                  <div key={craft.id} className="craft-card">
                    <img src={craft.image} alt={craft.name} />
                    <div className="craft-details">
                      <h4>{craft.name}</h4>
                      <p className="craft-artisan">By {craft.artisan}</p>
                      <p className="craft-description">{craft.description}</p>
                      <p className="craft-price">${craft.price}</p>
                      <div className="craft-actions">
                        {cart.find(item => item.id === craft.id) ? (
                          <div className="quantity-controls">
                            <button onClick={() => removeFromCart(craft.id)}>
                              Remove
                            </button>
                            <input 
                              type="number" 
                              min="1"
                              value={cart.find(item => item.id === craft.id).quantity}
                              onChange={(e) => updateQuantity(craft.id, parseInt(e.target.value))}
                            />
                          </div>
                        ) : (
                          <button 
                            className="add-to-cart"
                            onClick={() => addToCart(craft)}
                          >
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shopping Cart */}
              {cart.length > 0 && (
                <div className="shopping-cart">
                  <h3>Shopping Cart</h3>
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>${item.price} × {item.quantity}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="cart-total">
                    <h4>Total: ${cart.reduce((total, item) => 
                      total + (item.price * item.quantity), 0).toFixed(2)}
                    </h4>
                    <button className="checkout-button">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocalEvents;
