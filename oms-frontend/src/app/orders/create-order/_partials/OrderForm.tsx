import React from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    CircularProgress,
    Select,
    MenuItem,
    Chip,
    FormControl,
    InputLabel
} from '@mui/material';
import { useOrders } from '@/app/hooks/orderHooks/useOrder';
import { useProducts } from '@/app/hooks/productHooks/useProducts';
import { Product, OrderItem } from '@/app/interfaces/data';

function OrderForm() {
    const {
        formData,
        handleChange,
        createOrder,
        loading,
        error,
        handleProductSelectChange,
        handleQuantityChange,
        selectedProductIds,
        calculateTotalAmount
    } = useOrders();

    const { products, loading: productsLoading } = useProducts();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createOrder();
    };

    // Modified to pass products to the handler
    const onProductSelectChange = (event: any) => {
        handleProductSelectChange(event, products);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    boxShadow: 1
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Create New Order
                </Typography>

                {productsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <FormControl fullWidth>
                        <InputLabel id="product-select-label">Select Products</InputLabel>
                        <Select
                            multiple
                            labelId="product-select-label"
                            name="orderItems"
                            value={selectedProductIds}
                            onChange={onProductSelectChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const product = products.find(p => p.id === value);
                                        return <Chip key={value} label={product?.name || value} />;
                                    })}
                                </Box>
                            )}
                        >
                            {products.map((product: Product) => (
                                <MenuItem key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Display selected products and quantity selectors */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {(formData.orderItems ?? []).map((item) => (
                        <Box key={item.id} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            border: '1px solid #eee',
                            borderRadius: 1
                        }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" fontWeight="medium">
                                    {item.product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${item.price} each
                                </Typography>
                            </Box>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={item.quantity === 0 ? '' : item.quantity}
                                onChange={(e) => handleQuantityChange(e, item.id)}
                                sx={{ width: 120 }}
                                error={item.quantity === 0}
                                helperText={item.quantity === 0 ? "Required" : ""}
                            />
                            <Typography variant="body2" sx={{ minWidth: 80, textAlign: 'right' }}>
                                Total: ${item.quantity > 0 ? ((item.price) * item.quantity).toFixed(2) : '0.00'}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Total Amount Display */}
                {formData.orderItems && formData.orderItems.length > 0 && (
                    <Box sx={{
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h6">
                            Order Total:
                        </Typography>
                        <Typography variant="h6" color="primary">
                            ${calculateTotalAmount().toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <TextField
                    label="Delivery Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                />

                <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={
                        loading ||
                        productsLoading ||
                        !formData.orderItems?.length ||
                        formData.orderItems?.some(item => item.quantity <= 0)
                    }
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Order'}
                </Button>

                {error && (
                    <Typography color="error" align="center" sx={{ mt: 1 }}>
                        Error: {error.message}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default OrderForm;