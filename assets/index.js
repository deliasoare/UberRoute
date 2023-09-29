import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

// React rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Leaflet initialization
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map on the "map" div with a given center and zoom level.
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Add the OpenStreetMap tile layer to the map.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});
