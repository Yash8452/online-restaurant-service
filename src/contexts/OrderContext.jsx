"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);



export const OrderProvider = ({ children }) => {

    const [orders, setOrders] = useState([]);


    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            let res = await fetch('/api/orders');
            res = await res.json();
            // console.log(res)
            const data = res.orders;
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Add a new order
    const addOrder = async (id) => {
        try {
            let res = await fetch(`/api/orders?id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(id),
            });
            res = await res.json();
            console.log(res)
            const data = res.savedOrder
            setOrders([...orders, data]);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };




    useEffect(() => {
        fetchOrders();
    }, []);


    // console.log(orders)

    return (
        <OrderContext.Provider value={{ orders,setOrders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
