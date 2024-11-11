import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button, TextField, Pagination, CircularProgress, Grid2, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchProducts from '../../components/hooks/products/useFetchProducts';
import './Product.css';
import useWishlist from '../../components/hooks/useWishlist';

export default function Products({ truncateDescription }) {
  const { handleWishlistToggle, wishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { productList, loading, error, totalPages } = useFetchProducts(searchTerm, minPrice, maxPrice, pageNumber, pageSize);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  if (loading) return <CircularProgress size="200px" />;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = productList.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '10px' }}
          autoFocus
        />
        <TextField
          label="Min Price"
          variant="outlined"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ marginRight: '10px' }}
        />
      </div>

      <div className='card-container'>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Card sx={{ maxWidth: 345 }} className='cards'>
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
                    {wishlist.includes(product.productId) ? 'Remove from Cart' : 'Add to Cart'}
                  </Button>
                  <Link to={`/products/${product.productId}`}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(event, value) => setPageNumber(value)}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
}
