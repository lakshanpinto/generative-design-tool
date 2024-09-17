import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SelectedArea from './components/SelectedArea';
import './index.css'; // Import your own styles
import './App.css';   // Custom styles for App component
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS

function App() {
  const [selectedBounds, setSelectedBounds] = useState(null);

  return (
    <div className="App">
      <div className="map-container">
        <MapComponent setSelectedBounds={setSelectedBounds} />
      </div>
      <div className="selected-area-container">
        <SelectedArea bounds={selectedBounds} />
      </div>
    </div>
  );
}

export default App;
