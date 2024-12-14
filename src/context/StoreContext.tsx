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
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filters, setFilters] = useState<{ [key: string]: string[] }>({});

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
