import { useState } from 'react';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

const useProductActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${PRODUCTS_URL}`, productData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  const updateProduct = async (productId, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${PRODUCTS_URL}/${productId}`, productData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${PRODUCTS_URL}/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  };

  return { createProduct, updateProduct, deleteProduct, loading, error };
};

export default useProductActions;
