// Schema for Order
import { defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customerName",
      title: "Customer Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "dish",
              title: "Dish",
              type: "reference",
              to: [{ type: "menu" }],
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "dishSlug",
      title: "Dish Slug",
      type: "string",
    },
    {
      name: "totalPrice",
      title: "Total Price",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "In Progress", value: "in_progress" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "pending",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    },
  ],
});
