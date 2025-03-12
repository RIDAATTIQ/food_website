"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, totalPrice, updateQuantity } = useCart();
  const [orderMessage, setOrderMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setOrderMessage("Your cart is empty!");
      return;
    }
    setLoading(true);
    setOrderMessage("");

    const orderDetails = {
      customerName: name.trim(),
      email: email.trim(),
      deliveryAddress: deliveryAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      specialInstructions: specialInstructions.trim(),
      paymentMethod,
      items: cart,
      totalPrice: totalPrice,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      if (response.ok) {
        setOrderMessage("✅ Order placed successfully!");
        setName("");
        setEmail("");
        setDeliveryAddress("");
        setPhoneNumber("");
        setSpecialInstructions("");
        setPaymentMethod("Cash on Delivery");
        clearCart();
      } else {
        setOrderMessage(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order submit error:", error);
      setOrderMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow-md bg-orange-600">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                      onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="text-gray-600">{item.quantity}</p>
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded"
                      onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ${item.price * item.quantity}
                  </p>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-red-600 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-8 border-t pt-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="w-full p-2 border rounded" required />
              <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 border rounded" required />
              <textarea placeholder="Special Instructions (Optional)" value={specialInstructions} onChange={(e) => setSpecialInstructions(e.target.value)} className="w-full p-2 border rounded" />
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-2 border rounded">
                <option>Cash on Delivery</option>
                <option>Credit Card</option>
              </select>
              <button type="submit" disabled={loading} className="w-full bg-green-900 text-white py-2 rounded hover:bg-orange-600">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
            {orderMessage && <p className="mt-4 text-center text-xl font-semibold">{orderMessage}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
