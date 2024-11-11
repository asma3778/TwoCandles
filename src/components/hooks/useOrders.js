import { useState, useEffect } from 'react';
import axios from 'axios';
import { ORDERS_URL } from './config';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${ORDERS_URL}`, {
        });

        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
