import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

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

  const handleSave = () => {
    onSave({ ...pin, name });
    onClose();
  };

  if (!pin) return null;

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Pin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPinName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <p>Dirección: {address}</p>
          <p>Latitud: {pin.lat}</p>
          <p>Longitud: {pin.lng}</p>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PinModal;