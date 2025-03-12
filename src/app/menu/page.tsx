"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  slug: { current: string };
  category: string;
}

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const query = `*[_type == "menu"]`;
        const data: MenuItem[] = await client.fetch(query);
        setMenuItems(data);

        const uniqueCategories = ["All", ...new Set(data.map((item: MenuItem) => item.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full px-6 py-8 flex flex-col items-center bg-emerald-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      
      {/* Category Buttons */}
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`py-2 px-4 rounded-lg transition ${
              selectedCategory === category ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="bg-white shadow-lg rounded-lg p-4">
            {item.image && (
              <Image
                src={urlFor(item.image).url()}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-48"
              />
            )}
            <h2 className="text-xl font-semibold mt-2">{item.name}</h2>
            <p className="text-red-500 font-bold mt-2">${item.price}</p>
            <Link href={`/menu/${item.slug.current}`}>
              <button className="mt-3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
