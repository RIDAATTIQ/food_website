"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/app/context/CartContext"; 

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const MenuItemDetails = () => {
  const { slug } = useParams();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const query = `*[_type == "menu" && slug.current == $slug][0]`;
        const data = await client.fetch(query, { slug });
        setMenuItem(data);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchMenuItem();
    }
  }, [slug]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  if (!menuItem) {
    return <p className="text-center text-red-500">Item not found</p>;
  }

  const handleAddToCart = () => {
    if (!menuItem) return;
  
    const itemWithQuantity = { ...menuItem, quantity: 1 };
    console.log("Adding to cart:", itemWithQuantity);
  
    addToCart(itemWithQuantity);
    router.push("/cart");
  };

  return (
    <div className="w-full px-6 py-8 flex flex-col items-center bg-gray-100 min-h-screen">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {menuItem.image && (
          <Image
            src={urlFor(menuItem.image).url()}
            alt={menuItem.name}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-64"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{menuItem.name}</h1>
        <p className="text-lg text-gray-700 mt-2">{menuItem.description || "No description available"}</p>
        <p className="text-xl font-semibold text-red-500 mt-3">${menuItem.price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuItemDetails;
