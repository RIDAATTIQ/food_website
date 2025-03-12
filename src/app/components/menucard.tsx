"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { urlFor } from "@/sanity/lib/client";

const defaultImage = "/placeholder.jpg";

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  description: string;
}

const MenuCard = ({ _id, name, price, image, description }: MenuItem) => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Validate image URL; if missing or empty, use defaultImage
  let imgSrc = defaultImage;
  if (image) {
    try {
      imgSrc = typeof image === "string" ? image : urlFor(image).url();
    } catch (error) {
      console.error("Image error:", error);
    }
  }
  const [currentImg, setCurrentImg] = useState(imgSrc);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    // Add item to cart
    addToCart({ _id, name, price, image: currentImg, quantity: 1 });
    // Redirect directly to cart page
    router.push("/cart");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <Image
        src={currentImg}
        alt={name}
        className="w-full h-40 object-cover rounded-md"
        width={160}
        height={160}
        onError={() => setCurrentImg(defaultImage)}
      />
      <h2 className="mt-2 text-lg font-bold">{name}</h2>
      <p className="text-gray-700">Price: ${price}</p>

      {/* Add to Cart Button redirects to Cart page */}
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        Add to Cart
      </button>

      
      {/* View Details Button toggles description */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        {showDetails ? "Hide Details" : "View Details"}
      </button>
      {showDetails && (
        <div className="mt-2 p-2 border rounded">
          <p className="text-gray-600">{description || "No description available"}</p>
        </div>
      )}
    

    </div>
  );
};

export default MenuCard;



























