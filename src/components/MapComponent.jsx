// App.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw"; // Import the Leaflet-Draw plugin

const DrawControl = ({ setSelectedBounds }) => {
  const map = useMap(); // Hook to access the map instance

  useEffect(() => {
    // Create a feature group to hold drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Add draw control to the map
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true, // Enable polygon drawing
        rectangle: true, // Enable rectangle drawing
        circle: false,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl); // Add the draw control to the map

    // Event handler for when a new shape is created
    const handleDrawCreate = (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      if (layer instanceof L.Rectangle || layer instanceof L.Polygon) {
        const bounds = layer.getBounds();
        setSelectedBounds(bounds); // Call the setSelectedBounds function with the shape's bounds
      }
    };

    // Listen for the draw:create event
    map.on(L.Draw.Event.CREATED, handleDrawCreate);

    // Cleanup function to remove controls and listeners
    return () => {
      map.off(L.Draw.Event.CREATED, handleDrawCreate);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, setSelectedBounds]);

  return null; // This component does not render anything visually
};

const MapComponent = ({ setSelectedBounds }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Custom draw control component */}
      <DrawControl setSelectedBounds={setSelectedBounds} />
    </MapContainer>
  );
};

export default MapComponent;
