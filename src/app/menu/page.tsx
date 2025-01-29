"use client"; // Ensure this is at the top

import { useState, useEffect } from "react";
import MenuListing from "../components/menulisting";
import { client } from "@/sanity/lib/client"; // Ensure correct sanity client import

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  slug: string;
  category: string;
}

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "menu"]{_id, name, price, description, image, slug, category}`;
      const data = await client.fetch(query);
      setMenuItems(data);
    };

    fetchData();
  }, []);

  const categories = ["starter", "main_course", "dessert", "beverage"];

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>

      {/* Category Filter */}
      <div className="mb-4 flex space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category ? "bg-gray-800 text-white" : "bg-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Menu Items */}
      <MenuListing items={filteredItems} />
    </div>
  );
};

export default MenuPage;
