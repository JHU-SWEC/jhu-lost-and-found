import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { ObjectId } from "mongodb";

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
    // Require authentication to create items
    const session = await getServerSession(authOptions as any);
    if (!session || !(session as any).user?.email) {
      return NextResponse.json({ message: "You must be logged in to post an item" }, { status: 401 });
    }

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
      postedBy: (session as any).user.email.toLowerCase(), // Always store actual poster for delete auth
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

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    // Validate session
    const session = await getServerSession(authOptions as any);
    if (!session || !(session as any).user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(id) });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

  const email = (session as any).user.email.toLowerCase();
    const ownerEmail = (item.postedBy || item.user || "").toLowerCase();
    if (ownerEmail !== email) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await db.collection("items").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting item:", error);
    return NextResponse.json({ message: error.message || "Failed to delete item" }, { status: 500 });
  }
}
