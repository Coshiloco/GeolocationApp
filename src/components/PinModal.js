import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function PinModal({ pin, onClose }) {
  if (!pin) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pin.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Latitude: {pin.lat}</p>
        <p>Longitude: {pin.lng}</p>
        {/* Añade más detalles del pin aquí */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PinModal;