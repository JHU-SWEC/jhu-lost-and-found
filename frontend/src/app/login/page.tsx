"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);

    if (result?.error) {
      alert(result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Log in with JHED Email</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-3"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm px-3">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          <FcGoogle size={24} className="mr-2" />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
