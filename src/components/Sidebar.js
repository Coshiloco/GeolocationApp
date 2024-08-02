import React from 'react';

function Sidebar({ pins, onPinClick }) {
  return (
    <div className="sidebar">
      <h2>Pins</h2>
      <ul className="pin-list">
        {pins.map((pin) => (
          <li key={pin.id} onClick={() => onPinClick(pin)}>
            {pin.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;