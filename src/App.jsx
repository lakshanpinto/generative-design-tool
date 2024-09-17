import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import SelectedArea from './components/SelectedArea';
import './App.css';   // Custom styles for App component

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
