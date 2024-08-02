import React, { useState } from 'react';
import { List, Menu } from 'lucide-react';

function Sidebar({ pins, onPinClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="hamburger-button" onClick={toggleSidebar}>
        {isOpen ? <Menu size={24} /> : <List size={24} />}
      </button>
      <div className="sidebar-content">
        <h2>Pins</h2>
        <ul className="pin-list">
          {pins.map((pin) => (
            <li key={pin.id} onClick={() => onPinClick(pin)}>
              {pin.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;