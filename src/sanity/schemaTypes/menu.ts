import { defineType } from "sanity";

// Define the menu schema
export default defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Dish Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Starter", value: "starter" },
          { title: "Main Course", value: "main_course" },
          { title: "Dessert", value: "dessert" },
          { title: "Beverage", value: "beverage" },
        ],
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
