import React from 'react';

const Sidebar: React.FC = () => {
    const filters = {
        Color: ['Red', 'Blue', 'Green'],
        Gender: ['Men', 'Women'],
        Price: ['0-250', '251-450', '450+'],
        Type: ['Polo', 'Hoodie', 'Basic'],
    };

    return (
        <div className="w-64 bg-gray-100 p-4">
            {Object.entries(filters).map(([category, options]) => (
                <div key={category} className="filter-category mb-4">
                    <h3 className="mb-2 text-lg font-semibold">{category}</h3>
                    {options.map((option) => (
                        <div
                            key={option}
                            className="filter-option mb-1 flex items-center"
                        >
                            <input
                                type="checkbox"
                                id={`${category}-${option}`}
                                name={category}
                                value={option}
                                className="mr-2"
                            />
                            <label
                                htmlFor={`${category}-${option}`}
                                className="text-sm"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
