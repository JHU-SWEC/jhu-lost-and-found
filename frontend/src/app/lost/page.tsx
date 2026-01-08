"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: string;
  imageUrl: string;
  user?: string;
}

export default function LostPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null); //modal lol 

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

  useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setSelectedItem(null);
    }
  }

  if (selectedItem) {
    window.addEventListener("keydown", handleKeyDown);
  }

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
  }, [selectedItem]);

  return (
    <main className="min-h-screen py-8">
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
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer border rounded-md p-4 shadow-sm hover:shadow-md transition"
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
                  📅  {" "}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedItem(null)} // close on backdrop click
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()} // don't close when clicking inside
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>

              {selectedItem.imageUrl && (
                <div className="w-full items-center flex justify-center aspect-[4/3] rounded-md overflow-hidden mb-4">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.title}
                    className="h-full object-cover"
                  />
                </div>
              )}


              <h2 className="text-2xl font-bold">{selectedItem.title}</h2>

              {selectedItem.description && (
                <p className="text-gray-700 mt-2">
                  {selectedItem.description}
                </p>
              )}

              <p className="text-gray-500 mt-3">
                📍 {selectedItem.location || "Unknown"}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(selectedItem.createdAt).toLocaleString()}
              </p>
            </div>
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
