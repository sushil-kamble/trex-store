'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Product {
    id: string;
    imageURL: string;
    name: string;
    price: number;
    currency: string;
    quantity: number;
    color: string;
    type: string;
    gender: string;
}

interface StoreContextProps {
    products: Product[];
    cart: { [key: string]: number };
    addToCart: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filters: { [key: string]: string[] };
    updateFilter: (category: string, option: string, checked: boolean) => void;
    applyFilters: (
        products: Product[],
        filters: { [key: string]: string[] }
    ) => Product[];
    clearCart: () => void;
    resetFilters: () => void;
}

interface StoreProviderProps {
    children: React.ReactNode;
    initialProducts: Product[];
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({
    children,
    initialProducts,
}: StoreProviderProps) => {
    const [products] = useState<Product[]>(initialProducts);
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Error parsing cart from localStorage:', e);
            }
        }
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

    const clearCart = () => {
        setCart({});
    };

    const updateFilter = (
        category: string,
        option: string,
        checked: boolean
    ) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            if (checked) {
                if (!newFilters[category]) {
                    newFilters[category] = [];
                }
                newFilters[category].push(option);
            } else {
                newFilters[category] = newFilters[category].filter(
                    (item) => item !== option
                );
                if (newFilters[category].length === 0) {
                    delete newFilters[category];
                }
            }
            return newFilters;
        });
    };

    const applyFilters = (
        products: Product[],
        filters: { [key: string]: string[] }
    ) => {
        return products.filter((product) => {
            return Object.keys(filters).every((category) => {
                if (!filters[category].length) return true;
                if (category === 'Price') {
                    return filters[category].some((range) => {
                        const [min, max] = range.split('-').map(Number);
                        return (
                            product.price >= min &&
                            (max ? product.price <= max : true)
                        );
                    });
                }
                if (category === 'Color') {
                    return filters[category].includes(product.color);
                }
                if (category === 'Type') {
                    return filters[category].includes(product.type);
                }
                if (category === 'Gender') {
                    return filters[category].includes(product.gender);
                }
                return true;
            });
        });
    };

    const resetFilters = () => {
        setSearchQuery('');
        setFilters({});
    };

    // Save cart to localStorage when it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <StoreContext.Provider
            value={{
                products,
                cart,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                searchQuery,
                setSearchQuery,
                filters,
                updateFilter,
                applyFilters,
                clearCart,
                resetFilters,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
