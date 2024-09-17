import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw/dist/leaflet.draw.js';

const MapComponent = ({ setSelectedBounds }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Create a feature group to hold drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Add draw control to the map
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        circle: false,
        marker: false,
        polyline: false,
        rectangle: true,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });
    map.addControl(drawControl);

    // Event handler for when a new shape is created
    const handleDrawCreate = (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);

      if (layer instanceof L.Rectangle) {
        const bounds = layer.getBounds();
        setSelectedBounds(bounds);
      }
    };

    // Listen for the draw:create event
    map.on(L.Draw.Event.CREATED, handleDrawCreate);

    // Cleanup function to remove controls and layers
    return () => {
      map.off(L.Draw.Event.CREATED, handleDrawCreate);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [setSelectedBounds]);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default MapComponent;
