import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

import { updatePin } from '../services/mockApi';

function PinModal({ pin, onClose, onSave }) {
  const [name, setName] = useState(pin.name);
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pin.lat}&lon=${pin.lng}`);
      setAddress(response.data.display_name);
    };
    fetchAddress();
  }, [pin]);

  const handleSave = async () => {
    try {
      const updatedPin = { ...pin, name };
      const savedPin = await updatePin(updatedPin);
      onSave(savedPin);
      onClose();
    } catch (error) {
      console.error('Error to update pin:', error);
    }
  };

  if (!pin) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Pin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPinName">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <p>Address: {address}</p>
          <p>Latitude: {pin.lat}</p>
          <p>Longitude: {pin.lng}</p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PinModal;