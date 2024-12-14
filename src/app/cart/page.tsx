'use client';
import React from 'react';
import { useStore } from '~/context/StoreContext';
import { useRouter } from 'next/navigation';

const CartPage = () => {
    const router = useRouter();
    const {
        cart,
        products,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        resetFilters,
    } = useStore();

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
        resetFilters();
        router.push('/');
    };

    return (
        <div className="container mx-auto p-4">
            <button
                onClick={() => router.back()}
                className="mb-4 text-blue-500 hover:text-blue-600"
            >
                ← Back
            </button>

            <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>

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

export default CartPage;
