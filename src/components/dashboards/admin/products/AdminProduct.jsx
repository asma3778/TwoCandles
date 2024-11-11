import React, { useState, useEffect } from 'react';
import AdminSidebar from '../admin dashboard/AdminSidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import './AdminProducts.css';
import useFetchProducts from '../../../hooks/products/useFetchProducts';
import useProductActions from '../../../hooks/products/useProductActions';

export default function AdminProduct() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 6;
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    description: '',
    stockQuantity: '',
    imageUrl: '',
    categoryId: '',
  });
  const { createProduct, updateProduct, deleteProduct, loading } = useProductActions();

  const { productList, error, totalPages } = useFetchProducts(searchTerm, minPrice, maxPrice, pageNumber, pageSize);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(0);
  };

  const filteredProducts = productList.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFilteredProducts = filteredProducts
    .slice().sort((a, b) => b.productId - a.productId);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    const createdProduct = await createProduct(productData);
    if (createdProduct) {
      setProductData({
        productName: '',
        price: '',
        description: '',
        stockQuantity: '',
        imageUrl: '',
        categoryId: '',
      });
      setIsFormOpen(false);
    }
  };

  const handleUpdate = async () => {
    if (editingProduct) {
      const updatedProduct = await updateProduct(editingProduct.productId, productData);
      if (updatedProduct) {
        setEditingProduct(null);
        setProductData({
          productName: '',
          price: '',
          description: '',
          stockQuantity: '',
          imageUrl: '',
          categoryId: '',
        });
        setIsFormOpen(false);
      }
    }
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductData({
      productName: product.productName,
      price: product.price,
      description: product.description,
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
    });
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setProductData({
      productName: '',
      price: '',
      description: '',
      stockQuantity: '',
      imageUrl: '',
      categoryId: '',
    });
  };

  if (loading) return <CircularProgress size="200px" />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-header">Admin Product</h1>
      <AdminSidebar />
      <div className="products-create">
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

        <Button
          onClick={() => setIsFormOpen(true)}
          className="products-button-create"
        >
          Create Product
        </Button>
      </div>
      <div className="products-container">
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <Table className="product-table">
            <TableHead>
              <TableRow>
                <TableCell>Product Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedFilteredProducts.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="product-image"
                    />
                  </TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => handleEdit(product)}>Edit</EditIcon>
                  </TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() => handleDelete(product.productId)}>Delete</DeleteIcon>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </div>

      <Pagination
        count={totalPages}
        page={pageNumber}
        onChange={(event, value) => setPageNumber(value)}
        style={{ marginTop: '20px' }}
      />
      <Dialog open={isFormOpen} onClose={handleCloseForm}>
        <DialogTitle>{editingProduct ? 'Update Product' : 'Create New Product'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={productData.stockQuantity}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image URL"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Category ID"
            name="categoryId"
            value={productData.categoryId}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editingProduct ? handleUpdate : handleCreate}
            color="primary"
          >
            {editingProduct ? 'Update' : 'Create'} Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
