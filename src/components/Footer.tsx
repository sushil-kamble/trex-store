import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 py-4 text-white">
            <div className="container mx-auto text-center">
                <p>
                    &copy; {new Date().getFullYear()} Sushil. All rights
                    reserved.
                </p>
                <p>
                    Visit my website:
                    <a
                        href="https://sushil.kamble.vercel.app"
                        className="ml-1 text-blue-400 hover:underline"
                    >
                        sushil.kamble.vercel.app
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
