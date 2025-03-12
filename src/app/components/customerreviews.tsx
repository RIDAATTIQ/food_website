import React from "react";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Ali Khan",
      review:
        "Zaiqa Express ka khana bohot lazeez hai! Delivery bhi time par hoti hai.",
      rating: 5,
    },
    {
      name: "Sara Ahmed",
      review: "Bohot acha experience raha! Packaging bhi zabardast thi.",
      rating: 4,
    },
    {
      name: "Hamza Sheikh",
      review:
        "First time order kiya tha, aur bohot maza aya. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <section className="py-12 bg-amber-600 text-center">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((item, index) => (
          <div key={index} className="bg-amber-300 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">
              &quot;{item.review}&quot;
            </p>
            <p className="font-bold mt-4">- {item.name}</p>
            <p className="text-red-800">{"⭐".repeat(item.rating)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
