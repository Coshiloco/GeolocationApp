// src/hooks/useGeolocation.js

import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error) => {
      setError(`Unable to retrieve your location: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    // Opcionalmente, puedes usar watchPosition para actualizar la ubicación continuamente
    // const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);
    // return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error };
};

export default useGeolocation;