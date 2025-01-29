import Link from "next/link";
interface MenuItemProps {
  name: string;
  price: number;
  image: string;
  slug: string;
}

const MenuCard = ({ name, price, image, slug }: MenuItemProps) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg">
      <img src={image} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h2 className="mt-2 text-lg font-bold">{name}</h2>
      <p className="text-gray-700">Price: ${price}</p>
      <Link href={`/menu/${slug}`} className="text-blue-500 hover:underline mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
};

export default MenuCard;