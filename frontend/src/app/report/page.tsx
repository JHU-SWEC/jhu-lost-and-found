"use client";

import { useState } from "react";

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    // For now we just log and show a success message.
    // Replace with a POST to your API endpoint when ready (e.g. fetch('/api/items', { method: 'POST', body: JSON.stringify(...) }))
    console.log({ title, category, location, description });

    // Simulate success
    setTimeout(() => {
      setSubmitting(false);
      setMessage("Report submitted (local demo). Replace with real API call to persist.");
      setTitle("");
      setLocation("");
      setDescription("");
      setCategory("lost");
    }, 700);
  }

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Report Lost or Found Item</h1>
        <p className="text-muted-foreground mb-6">Fill in the details below to report an item.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border px-3 py-2">
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded border px-3 py-2" rows={4} />
          </div>

          <div>
            <button type="submit" disabled={submitting} className="rounded bg-blue-600 text-white px-4 py-2">
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>

          {message && <p className="text-sm text-green-600">{message}</p>}
        </form>
      </div>
    </main>
  );
}
