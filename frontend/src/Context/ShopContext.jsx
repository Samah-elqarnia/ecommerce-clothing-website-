import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;

    }
    return cart;
}
const ShopContextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    useEffect(() => {
        fetch('http://localhost:4100/allproducts')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAll_product(data);
                } else {
                    console.error("UnExpected data from allproducts:", data);
                    setAll_product([]);
                }
            })
            .catch((error) => console.error("Error fetching allproducts:", error))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4100/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "{}",
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data));
        }
    }, [])
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4100/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemId,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }

    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4100/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemId: itemId,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log(data));
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem
    }
    const placeOrder = async (orderData) => {
        if (localStorage.getItem('auth-token')) {
            const res = await fetch('http://localhost:4100/create-order', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            const data = await res.json();
            if (data.success) {
                setCartItems(getDefaultCart()); // clear local cart
            }
            return data;
        }
        return { success: false, error: 'Not logged in' };
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart, placeOrder };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}


export default ShopContextProvider;