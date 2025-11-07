"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FoundItemsView, { FoundItem } from "./components/FoundItemsView";

interface Item {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: string;
  user?: string;
}

export default function FoundPage() {
<<<<<<< HEAD
  const placeholder: FoundItem[] = [
    {
      id: 1,
      title: "Gray scarf",
      location: "MSE Library",
      date: "2025-10-18",
      description:
        "Found near the first-floor printers. No tag. Stored at the front desk. ",
    },
    {
      id: 2,
      title: "Car keys",
      location: "Brody Reading Room",
      date: "2025-10-21",
      description:
        "Hyundai. Blue lanyard with cracked clip.",
    },
  ];
=======
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoundItems() {
      try {
        const res = await fetch("http://localhost:500/api/items?found=true");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching found items:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFoundItems();
  }, []);
>>>>>>> b10741d60fee880e11e1c02008e84789891faf7b

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
<<<<<<< HEAD
        <h1 className="text-3xl font-bold mb-1">Found Items</h1>
        <p className="text-muted-foreground mb-6">
          Items other users have marked as found — hover (or focus) to preview more details.
        </p>

        <FoundItemsView items={placeholder} />

        <div className="mt-8">
          <Link href="/report" className="inline-block rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">
=======
        <h1 className="text-3xl font-bold mb-4">Found Items</h1>
        <p className="text-muted-foreground mb-6">
          Items other users have marked as found — check here to claim them.
        </p>

        {loading ? (
          <p>Loading found items...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No found items reported yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg">{item.title}</h2>

                {item.description && (
                  <p className="text-sm text-gray-700 mt-1">
                    {item.description}
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  📍 Location: {item.location || "Unknown"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Reported on: {new Date(item.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400">
                  Posted by: {item.user || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/report"
            className="inline-block rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
>>>>>>> b10741d60fee880e11e1c02008e84789891faf7b
            Report a lost or found item
          </Link>
        </div>
      </div>
    </main>
  );
}
