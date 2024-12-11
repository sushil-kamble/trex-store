import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-lg font-bold text-white">Trex Store</div>
                <div className="space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">
                        Home
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Products
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        About
                    </a>
                    <a href="#" className="text-gray-300 hover:text-white">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
