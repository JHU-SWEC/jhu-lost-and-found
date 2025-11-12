"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: string;
  user?: string;
}

export default function LostPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLostItems() {
      try {
        const res = await fetch("http://localhost:500/api/items?found=false");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching lost items:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLostItems();
  }, []);

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Lost Items</h1>
        <p className="text-muted-foreground mb-6">
          Browse items other users have reported as lost.
        </p>

        {loading ? (
          <p>Loading lost items...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">No lost items reported yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg">{item.title}</h2>

                {item.description && (
                  <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                )}

                <p className="text-sm text-gray-500 mt-2">
                  📍 Location: {item.location || "Unknown"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {/* Reported on:{" "} */}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>

                {/* <p className="text-xs text-gray-400">
                  Posted by: {item.user || "Anonymous"}
                </p> */}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/report"
            className="inline-block rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
            Report a lost or found item
          </Link>
        </div>
      </div>
    </main>
  );
}
