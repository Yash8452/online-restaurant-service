"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // Fetch products from API tested
    const fetchProducts = async () => {
        try {
            let res = await fetch('/api/products');
            res = await res.json();
            const data = res.products
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add a new product tested
    const addProduct = async (productData) => {
        try {
            let res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            res = await res.json();
            const data = res.savedProduct;
            setProducts([...products, data]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Update a product
    const updateProduct = async (id, updatedProductData) => {
        try {
            let res = await fetch(`/api/products?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });
            res = await res.json();
            const data = res.updatedProduct;
            setProducts(products.map(product => (product._id === id ? data : product)));
            console.log(products)
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
