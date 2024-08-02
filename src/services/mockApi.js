// src/services/mockApi.js

import axios from "axios";
import { API_URL } from "../config/configfrontend";

  
  export const getPins = async () => {
    try {
      const response = await axios.get(`${API_URL}/pins`);
      return response.data;
    } catch (error) {
      console.error('Error to obtain pins:', error);
      throw error;
    }
  };
  
  export const addPin = async (newPin) => {
    try {
      const response = await axios.post(`${API_URL}/pin`, newPin);
      return response.data;
    } catch (error) {
      console.error('Error to add pin:', error);
      throw error;
    }
  };
  
  export const updatePin = async (updatedPin) => {
    try {
      const response = await axios.put(`${API_URL}/pin/${updatedPin.id}`, updatedPin);
      return response.data;
    } catch (error) {
      console.error('Error to update pin:', error);
      throw error;
    }
  };
  