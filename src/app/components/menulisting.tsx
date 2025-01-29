import { urlFor } from "@/sanity/lib/client";
import Image from "next/image";
interface MenuItem {
  _id: string;
  image?: string;
  name: string;
  description: string;
  price: number;
}

interface MenuListingProps {
  items: MenuItem[];
}

const MenuListing = ({ items }: MenuListingProps) => {
  // Debugging step to check if items is received correctly
  console.log("MenuListing items:", items);

  if (!items || items.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item._id} className="menu-item border p-4 rounded-md shadow-md">
          {item.image && (
            <Image
              src={urlFor(item.image).url()}
              alt={item.name}
              width={160}
              height={160}
              className="w-full h-40 object-cover rounded-md mb-2"
            />
          )}
          <h3 className="text-xl font-bold">{item.name}</h3>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-lg font-semibold">${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuListing;
