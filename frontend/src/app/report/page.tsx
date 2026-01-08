"use client";

import { useState } from "react";

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  


  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitting(true);
  setMessage(null);

  console.log("imageUrl about to submit:", imageUrl);

  try {
    const res = await fetch("/api/items", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        found: category === "found",
        location,
        imageUrl, 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit");
    }

    setMessage("✅ Report submitted successfully!");
    setTitle("");
    setLocation("");
    setDescription("");
    setCategory("lost");
    setFile(null);
    setImageUrl(null);
    setUploadError(null);
  } catch (err: any) {
    console.error(err);
    setMessage(`❌ ${err.message}`);
  } finally {
    setSubmitting(false);
  }
}


  return (
    <main className="flex flex-col min-h py-8">
      <div className="max-w-2xs px-4 ml-0 sm:ml-4 lg:ml-8">
        <h1 className="text-2xl font-bold mb-4">Report Lost or Found Item</h1>
        <p className="text-muted-foreground mb-6">
          Fill in the details below to report an item.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Item name</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const selectedFile = e.target.files?.[0] || null;
                setFile(selectedFile);
                setImageUrl(null); // Reset previous image URL
                setUploadError(null);

                if (selectedFile) {
                  setUploading(true);
                  try {
                    const formData = new FormData();
                    formData.append("file", selectedFile);
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      throw new Error(data.message || "Upload failed");
                    }
                    console.log("Uploaded image URL:", data.secure_url);
                    setImageUrl(data.secure_url);
                  } catch (err: any) {
                    console.error("Upload error:", err);
                    setUploadError(err.message || "Failed to upload image");
                  } finally {
                    setUploading(false);
                  }
                }
              }}
              className="mb-2"
              disabled={uploading}
            />

            {uploading && (
              <p className="text-sm text-gray-600 mt-2">Uploading image...</p>
            )}

            {imageUrl && (
              <div className="mt-2">
                <p className="text-sm text-green-600">✅ Image uploaded successfully!</p>
                <img src={imageUrl} alt="Preview" className="mt-2 max-w-xs rounded" />
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-red-600 mt-2">❌ {uploadError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border px-3 py-2"
              rows={4}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-blue-600 text-white px-4 py-2"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
