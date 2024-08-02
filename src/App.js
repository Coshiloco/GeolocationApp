import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import PinModal from './components/PinModal';
import { getPins } from './services/mockApi';
import './styles/main.css';

function App() {
  const [pins, setPins] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPins = async () => {
      const fetchedPins = await getPins();
      setPins(fetchedPins);
    };
    fetchPins();
  }, []);

  const handleAddPin = (newPin) => {
    setPins([...pins, newPin]);
  };

  const handlePinClick = (pin) => {
    setSelectedPin(pin);
    setShowModal(true);
  };

  return (
    <div className="app-container">
      <Sidebar pins={pins} onPinClick={handlePinClick} />
      <Map pins={pins} onAddPin={handleAddPin} onPinClick={handlePinClick} />
      {showModal && (
        <PinModal pin={selectedPin} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default App;