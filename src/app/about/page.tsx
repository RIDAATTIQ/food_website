'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from bg-gray-700 via-white to-gray-600 flex flex-col items-center text-center px-6 py-12">
      <h1 className="text-5xl font-extrabold text-orange-600 mb-6 tracking-wide">About Zaiqa Express</h1>
      <p className="max-w-3xl text-black text-lg mb-12">
        Welcome to <span className="font-semibold text-orange-500">Zaiqa Express</span>, your go-to food delivery service!
        We bring <span className="font-bold text-black">delicious</span> and <span className="font-bold text-black">hygienic meals</span> straight to your doorstep with <strong>fast delivery</strong> and <strong>authentic flavors</strong>.
      </p>

      {/* Image and story section */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-12">
        <Image 
          src="/resturant.jpg"
          width={800}
          height={600}
          alt="Restaurant"
          className="rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105"
        />
        <div className="text-left max-w-md bg-orange-700 p-6 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-semibold text-black mb-4">Our Story</h2>
          <p className="text-black text-lg leading-relaxed">
            Zaiqa Express started with a passion for <strong>great food</strong> and <strong>excellent service</strong>. 
            Our journey began in the heart of Karachi, where we aimed to provide restaurant-quality meals at home. 
            Today, we serve <span className="text-orange-500 font-bold">hundreds of happy customers</span> daily!
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16 max-w-4xl bg-orange-600 p-8 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Why Choose Us?</h2>
        <ul className="text-black text-lg list-disc list-inside space-y-4">
          <li className="hover:text-orange-500 transition">🍽️ Fresh & Hygienic Ingredients</li>
          <li className="hover:text-orange-500 transition">🚀 Fast & Reliable Delivery</li>
          <li className="hover:text-orange-500 transition">💖 Customer Satisfaction Guaranteed</li>
        </ul>
      </div>

      {/* Explore Menu Button */}
      <Link href="/menu">
        <button className="mt-12 px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-orange-600 transition-transform duration-300 hover:scale-110">
          Explore Our Menu
        </button>
      </Link>
    </div>
  );
}
