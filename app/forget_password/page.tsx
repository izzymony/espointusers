"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";



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

    try {
      const response = await fetch('https://espoint-auth-8r6v.onrender.com/api/v1.0/forgot_password', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data?.msg && "If an account with that email exists, a password reset link has been sent to it.");
        setEmail("");
      } else {
        setError(data.error || "Failed to send reset link. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 ">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        {/* Left side illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src="/undraw_sign-in_uva0.svg"
            alt="Forgot Password Illustration"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Right side form */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-black">
              Forgot <span className="text-primary">Password?</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              No worries, we&apos;ll send you reset instructions.
            </p>
          </div>

          {/* Logo */}
          <div className="text-center mb-6">
            <Image
              src="/espointtower.jpg"
              alt="ESPOINT"
              width={100}
              height={120}
              className="mx-auto rounded-md shadow-md"
            />
          </div>

          <h2 className="text-black text-2xl font-extrabold text-center">
            Reset Password
          </h2>
          <p className="text-gray-500 font-medium text-base mt-1 text-center">
            Enter your email address below
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                placeholder="Enter your email address"
                disabled={loading}
                className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 ml-1 flex items-center">
                  <span className="mr-1">⚠️</span> {error}
                </p>
              )}
              {success && (
                <p className="text-green-600 text-sm mt-1 ml-1 flex items-center">
                  <span className="mr-1">✅</span> {success}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="bg-primary hover:bg-primary/90 text-black w-full py-4 mt-6 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-black"></span>
                  Sending...
                </span>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="text-center mt-6 pt-2">
              <Link
                href="/login"
                className="text-primary font-bold hover:underline text-sm"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;