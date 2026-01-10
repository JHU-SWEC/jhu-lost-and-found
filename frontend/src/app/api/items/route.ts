import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const found = searchParams.get("found");

    const client = await clientPromise;
    const db = client.db();

    let query: any = {};
    if (found !== null) {
      query.found = found === "true";
    }

    const items = await db.collection("items").find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Error fetching items:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, found, imageUrl, contactEmail, anonymous } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Determine the contact info - use "anonymous" if anonymous flag is true, otherwise use email
    const contact = anonymous ? "anonymous" : (contactEmail || "anonymous");

    const item = {
      title,
      description: description || "",
      location: location || "",
      found: found === true,
      imageUrl: imageUrl || "",
      user: contact, // Store as "anonymous" or the email address
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("items").insertOne(item);

    return NextResponse.json(
      { ...item, _id: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create item" },
      { status: 500 }
    );
  }
}
