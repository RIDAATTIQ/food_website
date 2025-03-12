import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!; // ✅ Environment variable se connection string le raha hai
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  try {
    await client.connect(); // ✅ Ensure connection is established
    const db = client.db(process.env.DATABASE_NAME); // ✅ Secure way to access database

    const { customerName, email, deliveryAddress, phoneNumber, specialInstructions, paymentMethod, items, totalPrice } = await req.json();

    if (!customerName || !email || !deliveryAddress || !phoneNumber || !paymentMethod || !items || !totalPrice) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const formattedItems = items.map((item: any) => ({
      description: item.description,
      image: item.image.url,
      slug: item.slug.current,
      category: item.category,
      _id: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const orderId = new ObjectId();
    
    const order = {
      orderId: orderId.toString(),
      customerName,
      email,
      deliveryAddress,
      phoneNumber,
      specialInstructions,
      paymentMethod,
      items: formattedItems,
      totalPrice,
      createdAt: new Date(),
    };

    await db.collection("orders").insertOne(order); // ✅ Order database me save ho raha hai

    return NextResponse.json({ message: "Order received", orderId: orderId.toString() }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: (error as Error).message }, { status: 500 });
  }
}
