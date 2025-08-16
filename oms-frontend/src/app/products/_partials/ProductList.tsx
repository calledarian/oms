'use client';

import React, { useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import { useProducts } from '@/app/hooks/productHooks/useProducts';
import 'glightbox/dist/css/glightbox.min.css';
import GLightbox from 'glightbox';
import './ProductList.css';

export default function ProductList() {
    const { products, loading, error, deleteProductById } = useProducts();

    useEffect(() => {
        const lightbox = GLightbox({ selector: '.glightbox' });
        return () => lightbox.destroy();
    }, [products]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', p: 3 }}>
                <CircularProgress size={48} />
            </Box>
        );
    }

    return (
        <div className="gallery-page">
            <div className="gallery-container">
                {error && (
                    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                        <Alert severity="error">{error.message}</Alert>
                    </Box>
                )}

                {products.length === 0 && !loading && (
                    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
                        <Alert severity="info">No products found.</Alert>
                    </Box>
                )}

                {/* Events Grid */}
                <div className="events-grid">
                    {products.map((product) => (
                        <div key={product.id} className="event-card">
                            <div className="event-thumbnail-container">
                                <a
                                    className="glightbox"
                                    data-gallery={`gallery-${product.id}`}
                                    data-title={product.name}
                                    data-description={product.description}
                                >
                                    <img
                                        src={product.images?.[0] || '/placeholder.jpg'}
                                        alt={product.name}
                                        className="event-thumbnail"
                                    />
                                </a>
                            </div>

                            <div className="event-info">
                                <h2 className="event-title">{product.name}</h2>
                                <p className="event-description">{product.description}</p>

                                <div className="event-actions">
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn" onClick={() => deleteProductById(product.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
