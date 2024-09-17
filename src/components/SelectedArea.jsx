import React from 'react';

const SelectedArea = ({ bounds }) => {
  if (!bounds) return <div>No area selected</div>;

  // Extract coordinates from the bounds object
  const nw = bounds.getNorthWest();
  const se = bounds.getSouthEast();

  return (
    <div style={{ padding: '10px' }}>
      <h2>Selected Land Area</h2>
      <p>North West: {nw.lat.toFixed(4)}, {nw.lng.toFixed(4)}</p>
      <p>South East: {se.lat.toFixed(4)}, {se.lng.toFixed(4)}</p>
      <div style={{ width: '100%', height: '100px', backgroundColor: '#e0e0e0', marginTop: '10px' }}>
        {/* Optionally render a visual representation of the selected area */}
      </div>
    </div>
  );
};

export default SelectedArea;
