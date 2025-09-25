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

    try {
      const response = await fetch("https://espoint-auth.onrender.com/api/v1.0/forgot_password", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", },
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col items-center justify-center px-4 py-8 opacity-3g">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/espointtower.jpg"
          alt="Espoint Logo"
          width={110}
          height={110}
          className="mx-auto rounded-md shadow-lg"
          priority
        />
      </div>

      {/* Icon */}
      <div className="bg-white p-4 rounded-full w-fit mx-auto mb-6 shadow-md">
        <Image
          src="/icons8-mail-50.png"
          alt="Mail Icon"
          height={34}
          width={34}
          className="mx-auto"
        />
      </div>

      {/* Title and Description */}
      <div className="text-center mb-8 max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          No worries, we&apos;ll send you reset instructions to your email.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl placeholder:text-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7464fa] focus:border-transparent transition-all duration-200"
            />
            {error && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 text-sm mt-2 flex items-center">
                <span className="mr-1">✅</span> {success}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-[#7464fa] hover:bg-[#5a4fd0] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          <div className="text-center">
            <Link 
              href="/login" 
              className="text-[#7464fa] hover:text-[#5a4fd0] underline font-medium transition-colors duration-200"
            >
              ← Back to Sign In
            </Link>
          </div>
        </form>
      </div>

      {/* Footer Note (Optional) */}
      <p className="mt-8 text-xs text-gray-500 text-center">
        Need help? Contact support at support@espoint.com
      </p>
    </div>
  );
};

export default ForgotPassword;