"use client";
import { useState } from "react";
import MenuCard, { MenuItem } from "./menucard";

const categories = [
  { title: "All", value: "all" },
  { title: "Starter", value: "starter" },
  { title: "Main Course", value: "main_course" },
  { title: "Dessert", value: "dessert" },
  { title: "Beverage", value: "beverage" },
];

const MenuListing = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter(
          (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === cat.value ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <MenuCard key={item._id} {...item} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default MenuListing;
