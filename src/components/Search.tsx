'use client';
import React from 'react';
import { useStore } from '../context/StoreContext';

const Search: React.FC = () => {
    const { searchQuery, setSearchQuery } = useStore();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Search query: ${searchQuery}`);
        setSearchQuery('');
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full gap-4">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full rounded-l border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search products..."
            />
            <button
                type="submit"
                className="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
