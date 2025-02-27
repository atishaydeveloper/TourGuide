import React, { useState } from 'react';
import SiteSelection from '../components/SiteSelection';
import MapView from '../components/MapView';
import AIAgent from '../components/AIAgent';
import Recommendations from '../components/Recommendations';
import BudgetPlanner from '../components/BudgetPlanner';
import LocalEvents from '../components/LocalEvents';

function Home() {
  const [selectedSite, setSelectedSite] = useState(null);

  const handleSiteSelected = (siteName) => {
    setSelectedSite(siteName);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <SiteSelection onSiteSelected={handleSiteSelected} />
        <AIAgent siteName={selectedSite} />
      </aside>

      <main className="main-content">
        {selectedSite && <MapView site={selectedSite} />}
        <Recommendations siteName={selectedSite} />
        <BudgetPlanner />
        <LocalEvents />
      </main>
    </div>
  );
}

export default Home;