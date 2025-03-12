"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OrderForm = () => {
  const router = useRouter();

  // 🛒 States for Order Details
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [items, setItems] = useState<any[]>([]); // Cart items
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !address || items.length === 0) {
      alert("❌ Customer name, address, and items are required!");
      return;
    }

    const orderData = {
      customerName,
      email,
      address,
      phoneNumber,
      specialInstructions,
      paymentMethod,
      items,
      totalPrice,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("API Response:", data); // ✅ Debugging

      if (data.error) {
        alert(data.error);
      } else if (data.orderId) {
        console.log("Response Data:", data);

        alert("✅ Order placed successfully!");
        setItems([]); // 🛒 Empty cart after order
        router.push(`/order-confirmation?orderId=${data.orderId}`); // 🔹 Redirect to Confirmation Page
      } else {
        console.error("❌ Order ID is missing in response:", data);
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Place Your Order</h2>

      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Special Instructions"
        value={specialInstructions}
        onChange={(e) => setSpecialInstructions(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Credit Card">Credit Card</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
