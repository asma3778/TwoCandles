import { useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

const useFetchProductDetails = (productId) => {
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            if (!productId) return;

            try {
                const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
                setProductDetails(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    return { productDetails, loading, error };
};

export default useFetchProductDetails;
