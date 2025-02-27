import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AIAgent({ siteName }) {
  const [narrative, setNarrative] = useState('');

  useEffect(() => {
    if (siteName) {
      axios.get(`/api/heritage-sites/${siteName}`)
        .then(response => {
          setNarrative(response.data.historicalNarrative);
        })
        .catch(error => {
          console.error("Error fetching site narrative:", error);
          setNarrative("Could not load narrative for this site.");
        });
    } else {
      setNarrative("Please select a heritage site to begin your tour.");
    }
  }, [siteName]);

  // TODO: Integrate ElevenLabs here - call their API and get an audio stream or pre-generated audio URL.

  return (
    <div>
      <h3>Tour Guide</h3>
      <p>{narrative}</p>
      {/* ElevenLabs widget or custom audio player */}
    </div>
  );
}

export default AIAgent;