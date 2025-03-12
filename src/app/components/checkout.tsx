"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty! Add items to proceed.");
      return;
    }

    const orderDetails = {
      name,
      address,
      phone,
      items: cartItems,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Order placed successfully!");
        // Clear form after successful order
        setName("");
        setAddress("");
        setPhone("");
      } else {
        setError("Failed to place order. Please try again.");
      }
    } catch (_error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
};

export default Checkout;
