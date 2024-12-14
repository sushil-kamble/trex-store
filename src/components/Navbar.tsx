'use client';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useStore } from '~/context/StoreContext';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const { cart } = useStore();
    const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="text-lg font-bold text-white">
                    Trex Store
                </Link>
                <Link href="/cart" className="flex items-center space-x-4">
                    <div className="relative">
                        <FaShoppingCart className="text-xl text-white" />
                        {cartItemsCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {cartItemsCount}
                            </span>
                        )}
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
