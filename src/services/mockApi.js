// src/services/mockApi.js

import axios from "axios";
import { API_URL } from "../config/configfrontend";

const mockPins = [
    { id: 1, lat: 40.7128, lng: -74.0060, name: "New York" },
    { id: 2, lat: 51.5074, lng: -0.1278, name: "London" },
    { id: 3, lat: 48.8566, lng: 2.3522, name: "Paris" },
  ];
  
  export const getPins = async () => {
    try {
      const response = await axios.get(`${API_URL}/pins`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los pines:', error);
      throw error;
    }
  };
  
  export const addPin = async (newPin) => {
    try {
      const response = await axios.post(`${API_URL}/pin`, newPin);
      return response.data;
    } catch (error) {
      console.error('Error al añadir el pin:', error);
      throw error;
    }
  };
  
  export const updatePin = async (updatedPin) => {
    try {
      const response = await axios.put(`${API_URL}/pin/${updatedPin.id}`, updatedPin);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el pin:', error);
      throw error;
    }
  };
  