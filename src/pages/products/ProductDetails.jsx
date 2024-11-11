import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import './Product.css';
import useFetchProductDetails from '../../components/hooks/products/useFetchProductDetails';
import { CircularProgress } from '@mui/material';
import useWishlist from '../../components/hooks/useWishlist';

function ProductDetail() {
    const { handleWishlistToggle, wishlist } = useWishlist();
    const { productId } = useParams();
    const { productDetails, loading, error } = useFetchProductDetails(productId);

    if (loading) return <CircularProgress size="200px" />;
    if (error) return <p>Error: {error}</p>;

    if (!productDetails) {
        return <p>Product not found</p>;
    }

    return (
        <Card className="product-detail-card">
            <CardMedia component="div" className="product-image">
                <img alt={productDetails.productName} src={productDetails.imageUrl} />
            </CardMedia>
            <CardContent className="product-content">
                <Typography className="product-title" gutterBottom variant="h5">
                    {productDetails.productName}
                </Typography>
                <Typography className="product-description" variant="body2">
                    {productDetails.description}
                </Typography>
                <Typography className="product-price">Price: ${productDetails.price}</Typography>
                <CardActions className="card-actions">
                    <Button size="small" onClick={() => handleWishlistToggle(productDetails.productId)}>
                        {wishlist.includes(productDetails.productId) ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                    <Link to="/products">
                        <Button size="small">Back</Button>
                    </Link>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default ProductDetail;
