"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OrderConfirmation = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("⚠️ Invalid order ID.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        console.log("API Response:", data); // ✅ Debugging

        if (response.ok) {
          setOrderDetails(data);
        } else {
          setError(data.error || "❌ Order not found.");
        }
      } catch (err) {
        setError("❌ Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-800 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        {loading ? (
          <p className="text-lg font-semibold">⏳ Loading order details...</p>
        ) : error ? (
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-green-600">✅ Order Confirmed!</h2>
            <p className="text-gray-700 mt-2">
              Thank you, <span className="font-semibold">{orderDetails.customerName}</span>! Your order has been successfully placed.
            </p>
            <p className="text-gray-700 mt-1">Order ID: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{orderId}</span></p>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
              <ul className="mt-2 text-gray-600">
                {orderDetails.items.map((item: any, index: number) => (
                  <li key={index} className="mt-1">
                    {item.name} - {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-bold mt-2">Total: ${orderDetails.totalPrice}</p>
            </div>

            <button
              onClick={() => window.location.href = "/"}
              className="mt-6 bg-red-800 hover:bg-stone-600 text-white px-6 py-2 rounded-lg transition-all"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
