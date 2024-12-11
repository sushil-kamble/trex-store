'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Product {
    id: string;
    imageURL: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
}

const Grid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        fetch(
            'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
        )
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const addToCart = (id: string) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: (prevCart[id] || 0) + 1,
        }));
    };

    const incrementQuantity = (id: string) => {
        setCart((prevCart) => ({
            ...prevCart,
            [id]: prevCart[id] + 1,
        }));
    };

    const decrementQuantity = (id: string) => {
        setCart((prevCart) => {
            const newCart = { ...prevCart };
            if (newCart[id] > 1) {
                newCart[id] -= 1;
            } else {
                delete newCart[id];
            }
            return newCart;
        });
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="rounded-lg border p-4 shadow-md"
                >
                    <div className="relative mb-4 h-48 w-full">
                        <Image
                            src={product.imageURL}
                            alt={product.name}
                            className="rounded-lg object-fill"
                            width={300}
                            height={500}
                            // blurDataURL="data:..." automatically provided
                            // placeholder="blur" // Optional blur-up while loading
                        />
                        {/* <img
                            src={product.imageURL}
                            alt={product.name}
                            className="rounded-lg"
                        /> */}
                    </div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">
                        {product.currency} {product.price}
                    </p>
                    {cart[product.id] ? (
                        <div className="mt-2 flex items-center">
                            <button
                                onClick={() => decrementQuantity(product.id)}
                                className="rounded bg-red-500 px-2 py-1 text-white"
                            >
                                -
                            </button>
                            <span className="mx-2">{cart[product.id]}</span>
                            <button
                                onClick={() => incrementQuantity(product.id)}
                                className="rounded bg-green-500 px-2 py-1 text-white"
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(product.id)}
                            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                        >
                            Add to cart
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Grid;
