import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
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
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
}

function AddMarkerToClick({ onAddPin }) {
  const map = useMap();
  useEffect(() => {
    const handleMapClick = (e) => {
      const newPin = {
        id: Date.now(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        name: `New Pin ${Date.now()}`,
      };
      onAddPin(newPin);
    };

    map.on('click', handleMapClick);
    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, onAddPin]);

  return null;
}

function MapContent({ pins, onAddPin, onPinClick }) {
  const { location, error } = useGeolocation();
  const defaultPosition = [40.4168, -3.7038]; // Madrid como posición por defecto
  const [initialLoad, setInitialLoad] = useState(true);

  if (error) {
    console.error("Error obtained user location:", error);
  }

  const position = location ? [location.latitude, location.longitude] : defaultPosition;

  useEffect(() => {
    if (initialLoad && location) {
      setInitialLoad(false);
    }
  }, [location, initialLoad]);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomControl position="bottomright" />
      {initialLoad && <SetViewOnClick coords={position} />}
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
    </>
  );
}

const Map = React.forwardRef(({ pins, onAddPin, onPinClick }, ref) => {
  return (
    <MapContainer 
      center={[40.4168, -3.7038]}
      zoom={13} 
      style={{ height: '100vh', width: '100%' }}
      zoomControl={false}
      ref={ref}
    >
      <MapContent pins={pins} onAddPin={onAddPin} onPinClick={onPinClick} />
    </MapContainer>
  );
});

export default Map;