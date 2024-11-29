// pages/products.tsx

import React from 'react';

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a brief description of Product 1. It highlights the key features and benefits.",
    price: "$19.99",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a brief description of Product 2. It provides insight into what makes this product unique.",
    price: "$29.99",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a brief description of Product 3. Perfect for those looking for quality and affordability.",
    price: "$39.99",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URLs
  },
];

const Products = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-blue-600 font-bold">{product.price}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

