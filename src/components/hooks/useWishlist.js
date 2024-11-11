import { useState, useEffect } from 'react';

const useWishlist = () => {
    const [wishlist, setWishlist] = useState(() => {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const handleWishlistToggle = (productId) => {
        setWishlist((prevWishlist) => {
            if (prevWishlist.includes(productId)) {
                return prevWishlist.filter((id) => id !== productId);
            } else {
                return [...prevWishlist, productId];
            }
        });
    };

    const clearWishlist = () => {
        setWishlist([]);
    };

    return { wishlist, handleWishlistToggle, clearWishlist };
};

export default useWishlist;
