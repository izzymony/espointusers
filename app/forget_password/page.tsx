"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) =>
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    // Mock success
    setTimeout(() => {
      setLoading(false);
      setSuccess(
        "If an account with that email exists, a password reset link has been sent to it."
      );
      setEmail("");
    }, 1500);
    // For real API:
    // try {
    //   await fetch("ENDPOINT_HERE", { method: "POST", ... })
    //   ...
    // } catch() { ... }
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="flex min-h-screen justify-center items-center p-4">
        <div className="bg-[#f5f5f5] w-full max-w-md p-5 border border-gray-300 shadow-lg rounded-md">
          <div className="mx-auto mb-4">
            <Image
              src={"/espointtower.jpg"}
              alt=""
              width={110}
              height={110}
              className="mx-auto rounded-md "/>
          </div>
          <h1 className="text-[#475569] text-2xl font-bold text-center">Forgot Password?</h1>
          <p className="text-[#475569] text-[16px] mt-2 text-center mb-4">
            Enter your email to receive password reset instructions.
          </p>
          <form onSubmit={handleSubmit} className="py-2">
            <div className="mb-4">
              <label htmlFor="email" className="text-black font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); setSuccess(""); }}
                placeholder="Enter your email address"
                className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-gray-400 p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-1">{success}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FFD700] w-full text-black p-2 mt-2 rounded-md font-bold"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-5">
              <Link href="/login" className="text-[#ffd700] underline">Back to Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
