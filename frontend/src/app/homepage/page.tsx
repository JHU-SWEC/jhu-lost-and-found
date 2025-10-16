"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login if not logged in
      window.location.href = "/login";
      return;
    }

    try {
      // Decode JWT to get user info (id and name)
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ name: payload.name, email: payload.email || "" });
    } catch {
      // If token is invalid, redirect to login
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to JHU Lost & Found</h1>

        {user && (
          <p className="text-lg mb-4">
            Logged in as <span className="font-semibold">{user.name}</span>
          </p>
        )}

        <p className="text-gray-600 mb-6">
          Here you can browse lost items, report new items, and manage your account.
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </main>
  );
}
