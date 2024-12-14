'use client';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Cart from './Cart';
import { useStore } from '~/context/StoreContext';

const Navbar: React.FC = () => {
    const { cart } = useStore();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

    const handleResetPopover = () => setOpen(false);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-lg font-bold text-white">Trex Store</div>
                <div className="flex items-center space-x-4">
                    <Popover open={open} onOpenChange={handleOpen}>
                        <PopoverTrigger>
                            <div className="relative">
                                <FaShoppingCart className="text-xl text-white" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </div>
                        </PopoverTrigger>
                        <PopoverContent align={'end'} sideOffset={10}>
                            <Cart resetCartPopper={handleResetPopover} />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
