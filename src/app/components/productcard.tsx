// ProductCard.tsx (Final Version)
"use client";
import React, { useState } from "react";
import Modal from "./modal";
import Cart from "./cart";
import Image from "next/image";
const ProductCard = () => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  
  const openDetailsModal = () => setIsDetailsModalOpen(true);
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  return (
    <div className="p-4">
      {/* Product Card */}
      <div className="bg-gray-100 p-4 rounded shadow">
        <Image
          src="/path/to/image.jpg"
          alt="..."
          width={400}
          height={300}
          objectFit="cover"
          // Add the following line to the Image component
// ...
/>

        
        <h2 className="text-xl font-bold mt-2">Loaded Pizza</h2>
        <p className="text-red-600 font-semibold">Price: $1000</p>

        {/* Buttons */}
        <button
          className="mt-2 bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-600600"
          onClick={openDetailsModal}
        >
          View Details
        </button>
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
          onClick={openCartModal}
        >
          Add to Cart
        </button>
      </div>

      {/* View Details Modal */}
      <Modal isOpen={isDetailsModalOpen} closeModal={closeDetailsModal}>
        <h2 className="text-xl font-bold mb-4">Loaded Pizza</h2>
        <p>
          A mouthwatering combination of a crispy golden crust, tangy tomato
          sauce, gooey melted cheese, and a variety of fresh toppings.
        </p>
        <p className="text-red-600 font-semibold mt-4">Price: $1000</p>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => {
            closeDetailsModal();
            openCartModal();
          }}
        >
          Order Now
        </button>
      </Modal>

      {/* Add to Cart Modal */}
      <Cart isOpen={isCartModalOpen} closeModal={closeCartModal} />
    </div>
  );
};

export default ProductCard;
