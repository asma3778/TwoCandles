import { useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

const useFetchProducts = (searchTerm = '', minPrice = '', maxPrice = '', pageNumber = 1, pageSize = 10) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`${PRODUCTS_URL}`, {
          params: {
            searchTerm,
            minPrice,
            maxPrice,
            pageNumber,
            pageSize
          }
        });

        setProductList(response.data.products);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, minPrice, maxPrice, pageNumber, pageSize]);

  return { productList, loading, error, totalPages };
};

export default useFetchProducts;
