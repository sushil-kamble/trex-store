'use client';
import React from 'react';
import { useStore } from '~/context/StoreContext';

type Props = {
    resetCartPopper: () => void;
};

const Cart = ({ resetCartPopper }: Props) => {
    const { cart, products, incrementQuantity, decrementQuantity, clearCart } =
        useStore();

    const cartItems = products.filter((product) => cart[product.id]);

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * (cart[item.id] || 0),
            0
        );
    };

    const handleCheckout = () => {
        alert('Thank you for your purchase!');
        clearCart();
        resetCartPopper();
    };

    return (
        <div className="cart-container">
            <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <div className="cart-items space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="cart-item flex items-center justify-between"
                            >
                                <div className="item-details">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <div className="item-controls flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            decrementQuantity(item.id)
                                        }
                                        className="rounded bg-gray-200 px-2 py-1"
                                    >
                                        -
                                    </button>
                                    <span>{cart[item.id]}</span>
                                    <button
                                        onClick={() =>
                                            incrementQuantity(item.id)
                                        }
                                        className="rounded bg-gray-200 px-2 py-1"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary mt-4 border-t pt-4">
                        <h3 className="font-bold">
                            Total: ${calculateTotal().toFixed(2)}
                        </h3>
                        {cartItems.length > 0 && (
                            <button
                                onClick={handleCheckout}
                                className="mt-4 w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                            >
                                Checkout
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
