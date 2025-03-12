"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";

interface Dish {
  _id: string;
  name: string;
  price: number;
  image: { asset: { _ref: string } }; // Correct Sanity Image Structure
}

const Hero = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const query = `*[_type == "menu"][0...9]`;
        const data: Dish[] = await client.fetch(query);
        setDishes(data);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    }
    fetchDishes();
  }, []);

  const backgroundImageUrl =
    "https://www.textures4photoshop.com/tex/thumbs/fast-food-restaurant-background-with-chalkboard-texture-free-94.jpg";

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="bg-gray-800 bg-opacity-60 p-8 rounded-lg max-w-2xl">
          <h1 className="text-amber-500 text-4xl md:text-7xl font-bold drop-shadow-lg">
            Delicious Food, Fast Delivery!
          </h1>
          <p className="text-white mt-4 text-lg">
            Order your favorite meals and get them delivered hot and fresh!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              href="/menu"
              className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-600 text-lg transition-all duration-300"
            >
              View Menu
            </Link>

            <Link
              href="/cart"
              className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 text-lg transition-all duration-300"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-12 text-center bg-orange-700">
        <h2 className="text-4xl font-bold text-white mb-6">Popular Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {dishes.map((dish) => (
            <div
              key={dish._id}
              className="p-4 rounded-lg shadow-lg hover:shadow-xl bg-orange-500 transition-all duration-300"
            >
              <Image
                src={urlFor(dish.image).width(300).height(200).url()}
                width={300}
                height={200}
                alt={dish.name}
                className="rounded-md"
                unoptimized
              />
              <h3 className="mt-3 text-2xl font-semibold text-white">
                {dish.name}
              </h3>
              <p className="text-lg text-yellow-200 font-bold">${dish.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;
