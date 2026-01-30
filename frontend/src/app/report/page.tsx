"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function ReportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("lost");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Auto-fill email from session when session loads (only if not anonymous and email is empty)
  useEffect(() => {
    if (session?.user?.email && !anonymous && !contactEmail) {
      setContactEmail(session.user.email);
    }
  }, [session?.user?.email]);

  // Auto-upload image when file is selected
  useEffect(() => {
    async function uploadImage() {
      if (!file) return;

      setUploading(true);
      setUploadError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to upload image");
        }

        console.log("Uploaded image URL:", data.secure_url);
        setImageUrl(data.secure_url);
      } catch (err: any) {
        console.error("Upload error:", err);
        setUploadError(err.message || "Failed to upload image");
        setFile(null);
      } finally {
        setUploading(false);
      }
    }

    uploadImage();
  }, [file]);

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
        contactEmail: anonymous ? "" : contactEmail,
        anonymous,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit");
    }

    setMessage("✅ Report submitted successfully!");

    // Redirect to the appropriate page (found or lost)
    const destination = category === "found" ? "/found" : "/lost";
    router.push(destination);

    // Note: we still reset local form state in case router doesn't navigate immediately
    setTitle("");
    setLocation("");
    setDescription("");
    setCategory("lost");
    setFile(null);
    setImageUrl(null);
    setUploadError(null);
    setAnonymous(false);
    // Reset email to session email after successful submission
    if (session?.user?.email) {
      setContactEmail(session.user.email);
    } else {
      setContactEmail("");
    }
  } catch (err: any) {
    console.error(err);
    setMessage(`❌ ${err.message}`);
  } finally {
    setSubmitting(false);
  }
}


  if (status === "loading") {
    return (
      <main className="flex flex-col min-h py-8">
        <div className="max-w-2xs px-4 ml-0 sm:ml-4 lg:ml-8">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex flex-col min-h py-8">
        <div className="max-w-2xs px-4 ml-0 sm:ml-4 lg:ml-8">
          <h1 className="text-2xl font-bold mb-4">Report Lost or Found Item</h1>
          <p className="text-gray-600 mb-6">
            You must be logged in to report an item.
          </p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/report" })}
            className="rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
            Log in to continue
          </button>
        </div>
      </main>
    );
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
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCategory("lost")}
                className={`flex-1 px-4 py-3 rounded border-2 transition font-semibold ${
                  category === "lost"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Lost
              </button>
              <button
                type="button"
                onClick={() => setCategory("found")}
                className={`flex-1 px-4 py-3 rounded border-2 transition font-semibold ${
                  category === "found"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                }`}
              >
                Found
              </button>
            </div>
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
            <label className="block text-sm font-medium mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full rounded border px-3 py-2"
              disabled={uploading}
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-1">Uploading image...</p>
            )}
            {uploadError && (
              <p className="text-sm text-red-600 mt-1">❌ {uploadError}</p>
            )}
            {imageUrl && !uploading && (
              <div className="mt-2">
                <p className="text-sm text-green-600 mb-2">✅ Image uploaded successfully!</p>
                <img
                  src={imageUrl}
                  alt="Upload preview"
                  className="max-w-xs max-h-48 rounded border"
                />
              </div>
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
            <label className="block text-sm font-medium mb-1">Contact Email</label>
            <div className="flex gap-2 items-center">
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                disabled={anonymous}
                className={`flex-1 rounded border px-3 py-2 ${anonymous ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                placeholder="Your email address"
              />
              <button
                type="button"
                onClick={() => {
                  const newAnonymous = !anonymous;
                  setAnonymous(newAnonymous);
                  if (newAnonymous) {
                    // When setting to anonymous, clear email
                    setContactEmail("");
                  } else if (session?.user?.email) {
                    // When unchecking anonymous, restore email
                    setContactEmail(session.user.email);
                  }
                }}
                className={`px-4 py-2 rounded border transition ${
                  anonymous
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {anonymous ? "Anonymous ✓" : "Anonymous"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {anonymous
                ? "Your email will not be shown to other users"
                : "This email will be visible to other users who want to contact you"}
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
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
