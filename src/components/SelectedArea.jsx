import React from 'react';
import 'leaflet/dist/leaflet.css';

const SelectedArea = ({ bounds }) => {
  if (!bounds) return <div>No area selected</div>;

  const { getNorthWest, getSouthEast } = bounds;
  const nw = getNorthWest();
  const se = getSouthEast();

  return (
    <div>
      <h2>Selected Land Area</h2>
      <p>North West: {nw.lat.toFixed(4)}, {nw.lng.toFixed(4)}</p>
      <p>South East: {se.lat.toFixed(4)}, {se.lng.toFixed(4)}</p>
      <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0' }}>
        {/* Optionally render a visual representation of the selected area */}
      </div>
    </div>
  );
};

export default SelectedArea;
