'use client';
import Image from 'next/image';
import React from 'react';
import { useStore } from '../context/StoreContext';

const Grid: React.FC = () => {
    const {
        products,
        cart,
        addToCart,
        incrementQuantity,
        decrementQuantity,
        searchQuery,
        filters,
        applyFilters,
    } = useStore();

    const filteredProducts = applyFilters(
        products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        filters
    );

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
                <div
                    key={product.id}
                    className="rounded-lg border p-4 shadow-md"
                >
                    <div className="relative mb-4 h-48 w-full">
                        <Image
                            src={product.imageURL}
                            alt={product.name}
                            className="rounded-lg object-cover"
                            width={200}
                            height={200}
                            blurDataURL="data:..."
                            placeholder="blur"
                        />
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
