import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Asegúrate de tener un icono para los marcadores
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function AddMarkerToClick({ onAddPin }) {
  useMapEvents({
    click: (e) => {
      const newPin = {
        id: Date.now(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: `New Pin ${Date.now()}`,
      };
      onAddPin(newPin);
    },
  });
  return null;
}

function Map({ pins, onAddPin, onPinClick }) {
  return (
    <MapContainer center={[0, 0]} zoom={3} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AddMarkerToClick onAddPin={onAddPin} />
      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]} eventHandlers={{ click: () => onPinClick(pin) }}>
          <Popup>{pin.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;