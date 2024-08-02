import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useGeolocation from '../hooks/useGeolocation';

// Configuración del icono por defecto (asegúrate de que las rutas sean correctas)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

function AddMarkerToClick({ onAddPin }) {
  const map = useMap();
  React.useEffect(() => {
    map.on('click', (e) => {
      const newPin = {
        id: Date.now(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: `New Pin ${Date.now()}`,
      };
      onAddPin(newPin);
    });
  }, [map, onAddPin]);
  return null;
}

function Map({ pins, onAddPin, onPinClick }) {
  const { location, error } = useGeolocation();
  const defaultPosition = [0, 0]; // Posición por defecto si no hay geolocalización

  if (error) {
    console.error("Error obteniendo geolocalización:", error);
  }

  const position = location ? [location.latitude, location.longitude] : defaultPosition;

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {location && <SetViewOnClick coords={position} />}
      <AddMarkerToClick onAddPin={onAddPin} />
      {pins.map((pin) => (
        <Marker key={pin.id} position={[pin.lat, pin.lng]} eventHandlers={{ click: () => onPinClick(pin) }}>
          <Popup>{pin.name}</Popup>
        </Marker>
      ))}
      {location && (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;