"use client"

import React, { useState } from "react";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
}

const orderItems: MenuItem[] = [
  {
    name: "Burger", price: 5,
    _id: ""
  },
  {
    name: "Pizza", price: 10,
    _id: ""
  },
  {
    name: "Pasta", price: 7,
    _id: ""
  },
];

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addItemToCart?: (item: MenuItem, quantity: number) => void; // 👈 Optional now
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, addItemToCart }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem>(orderItems[0]);
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    if (addItemToCart) { // 👈 Check if addItemToCart exists before calling it
      addItemToCart(selectedItem, quantity);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Order Form</h2>
        <div className="mb-4">
          <label htmlFor="item" className="block font-medium">Select Item</label>
          <select
            id="item"
            className="border rounded-md w-full p-2 mt-1"
            value={selectedItem.name}
            onChange={(e) => setSelectedItem(orderItems.find(item => item.name === e.target.value) || orderItems[0])}
          >
            {orderItems.map(item => (
              <option key={item.name} value={item.name}>{item.name} - ${item.price}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-medium">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="border rounded-md w-full p-2 mt-1"
            min={1}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
          <button onClick={handleAddToCart} className="px-4 py-2 bg-green-900 text-white rounded-md">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
