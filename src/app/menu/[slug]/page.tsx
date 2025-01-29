
// Menu Item Detail Page
//import { client } from "@/sanity/lib/client";
//import urlFor from "@sanity/image-url";

//const MenuItem = async ({ params }: { params: { slug: string } }) => {
  //const query = `*[_type == "menu" && slug.current == $slug][0]{
    //_id,
    //name,
    //price,
    //description,
    //image,
    //slug
  //}`;

  //const menuItem = await client.fetch(query, { slug: params.slug });

  //return (
    //<div className="container mx-auto p-4">
      //<h1 className="text-3xl font-bold">{menuItem.name}</h1>
      //<img
      //  src={menuItem.image ? urlFor(menuItem.image[0]).width(300).height(300).url() : 'default-image-url'}
        //alt={menuItem.name}
        //className="w-full h-80 object-cover rounded-md"
      ///>
    //  <p className="mt-4 text-gray-700">{menuItem.description}</p>
      //<p className="mt-2 text-xl font-semibold">Price: ${menuItem.price}</p>
    //</div>
  //);
//};

//export async function generateMetadata({ params }: { params: { slug: string } }) {
 // const query = `*[_type == "menu" && slug.current == $slug][0]{name}`;
 // const menuItem = await client.fetch(query, { slug: params.slug });
//
 // return {
  //  title: menuItem?.name || "Menu Item",
 // };
//}

//export default MenuItem;




















import { client } from "@/sanity/lib/client";
import Image from "next/image";
const fetchMenuItem = async (slugValue: string) => {
  const query = `*[_type == "menuItem" && slug.current == $slug][0] {
    _id,
    name,
    price,
    description,
    image,
    slug
  }`;

  const menuItem = await client.fetch(query, { slug: slugValue });
  return menuItem;
};

const MenuPage = async () => {
  const slug = "slug.value"; // Replace with actual slug value
  const menuItem = await fetchMenuItem(slug);

  if (!menuItem) {
    return <div>Item not found!</div>;
  }

  return (
    <div>
      <h1>{menuItem.name}</h1>
      <p>{menuItem.description}</p>
      <p>Price: ${menuItem.price}</p>
      {menuItem.image && (
        <Image src={menuItem.image.asset.url} alt={menuItem.name} width={160} height={160}/>
      )}
    </div>
  );
};

export default MenuPage;
