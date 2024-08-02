import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import PinModal from './components/PinModal';
import { getPins, addPin, updatePin } from './services/mockApi';
import './styles/main.css';

function App() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const fetchPins = async () => {
      const fetchedPins = await getPins();
      setPins(fetchedPins);
    };
    fetchPins();
  }, []);

  const handleAddPin = async (newPin) => {
    try {
      const addedPin = await addPin(newPin);
      setPins([...pins, addedPin]);
    } catch (error) {
      
      console.error('Error to add pin:', error);
    }
  };

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setShowModal(true);
  };

  const handleSavePin = async (updatedPin) => {
    try {
      const savedPin = await updatePin(updatedPin);
      setPins(pins.map(pin => pin.id === savedPin.id ? savedPin : pin));
    } catch (error) {
      console.error('Error to update pin:', error);
    }
  };

  const handleSidebarPinClick = (pin) => {
    if (mapRef.current && mapRef.current.flyTo) {
      mapRef.current.flyTo([pin.lat, pin.lng], 13, {
        duration: 2
      });
    }
    setSelectedPin(pin);
  };

  return (
    <div className="app-container">
      <Sidebar pins={pins} onPinClick={handleSidebarPinClick} />
      <Map ref={mapRef} pins={pins} onAddPin={handleAddPin} onPinClick={handlePinClick} />
      {showModal && (
        <PinModal pin={selectedPin} onClose={() => setShowModal(false)} onSave={handleSavePin} />
      )}
    </div>
  );
}

export default App;