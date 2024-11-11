import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetchProducts from '../components/hooks/products/useFetchProducts';
import useWishlist from '../components/hooks/useWishlist';

function Wishlist({ truncateDescription }) {
    const { handleWishlistToggle, wishlist, clearWishlist } = useWishlist();
    const { productList } = useFetchProducts();
    
    const wishlistItems = productList.filter(product => wishlist.includes(product.productId));
    
    const totalPrice = wishlistItems.reduce((acc, product) => acc + product.price, 0);

    return (
        <div className="wishlist">
            <h2>Your Cart</h2>
            <button className="products-button" onClick={clearWishlist}>
                Remove All
            </button>
            {wishlistItems.length > 0 && (
                <div className="total-price">
                    <Typography variant="h6">
                        Total Price: ${totalPrice.toFixed(2)}
                    </Typography>
                </div>
            )}
            <div className="card-container">
                {wishlistItems.length === 0 ? (
                    <Typography>No items in your Cart.</Typography>
                ) : (
                    wishlistItems.map((product) => (
                        <Card key={product.productId} sx={{ maxWidth: 345 }} className="cards">
                            <CardMedia className="card-media" component="div">
                                <img alt={product.productName} src={product.imageUrl} />
                            </CardMedia>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {truncateDescription(product.description, 100)}
                                </Typography>
                                <Typography>Price: ${product.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleWishlistToggle(product.productId)}>
                                    Remove from Cart
                                </Button>
                                <Link to={`/products/${product.productId}`}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Wishlist;
