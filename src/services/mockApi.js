// src/services/mockApi.js
const mockPins = [
    { id: 1, lat: 40.7128, lng: -74.0060, name: "New York" },
    { id: 2, lat: 51.5074, lng: -0.1278, name: "London" },
    { id: 3, lat: 48.8566, lng: 2.3522, name: "Paris" },
  ];
  
  export const getPins = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPins), 500);
    });
  };
  
  export const addPin = (newPin) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockPins.push(newPin);
        resolve(newPin);
      }, 500);
    });
  };