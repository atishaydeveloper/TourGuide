import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SiteSelection({ onSiteSelected }) {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    axios.get('/api/heritage-sites')
      .then(response => {
        setSites(response.data);
      })
      .catch(error => {
        console.error("Error fetching heritage sites:", error);
      });
  }, []);

  const handleChange = (event) => {
    const selectedSiteName = event.target.value;
    onSiteSelected(selectedSiteName); // Pass the selected site name to the parent component
  };

  return (
    <div>
      <label htmlFor="site-select">Choose a Heritage Site:</label>
      <select id="site-select" onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        {sites.map((site) => (
          <option key={site._id} value={site.name}>{site.name}</option>
        ))}
      </select>
    </div>
  );
}

export default SiteSelection;