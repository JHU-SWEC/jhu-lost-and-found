import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const found = searchParams.get("found");

    const client = await clientPromise;
    const db = client.db(); // Uses default database from connection string
    const collection = db.collection("items");

    // Build query based on found parameter
    let query = {};
    if (found === "true") {
      query = { found: true };
    } else if (found === "false") {
      query = { found: false };
    }

    const items = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { message: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, found, imageUrl, user } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("items");

    const newItem = {
      title,
      description: description || "",
      location: location || "",
      found: found || false,
      imageUrl: imageUrl || "",
      user: user || "Anonymous",
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newItem);

    return NextResponse.json(
      { ...newItem, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { message: "Failed to create item" },
      { status: 500 }
    );
  }
}
