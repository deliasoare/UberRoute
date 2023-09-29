import React, { useEffect } from 'react';

function MapComponent() {
  useEffect(() => {
    // Initialize the map on the "map" div with a given center and zoom level.
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Add the OpenStreetMap tile layer to the map.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default MapComponent;
