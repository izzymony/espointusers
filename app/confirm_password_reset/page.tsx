"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const SetNewPasswordClient = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
    setError("");
  };

  const validate = () => {
    let valid = true;
    const errs = { newPassword: "", confirmPassword: "" };

    if (!formData.newPassword) {
      errs.newPassword = "Enter your new password.";
      valid = false;
    } else if (formData.newPassword.length < 8) {
      errs.newPassword = "Password must be at least 8 characters long.";
      valid = false;
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = "Confirm your new password.";
      valid = false;
    }

    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      errs.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!uidb64 || !token) {
      setError("Invalid or missing reset link.");
      return;
    }

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://espoint-auth-8r6v.onrender.com/api/v1.0/auth/password_reset_confirm/${uidb64}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password: formData.newPassword,
            confirm_password: formData.confirmPassword,
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Your password has been changed successfully! Redirecting...");
        setFormData({ newPassword: "", confirmPassword: "" });
        setErrors({ newPassword: "", confirmPassword: "" });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(data?.message || data?.detail || "Failed to change password. Please try again.");
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
            alt="Reset Password Illustration"
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
              Set New <span className="text-primary">Password</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Enter your new password below.
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
            New Password
          </h2>
          <p className="text-gray-500 font-medium text-base mt-1 text-center">
            Make sure it&apos;s strong and memorable
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl flex items-center gap-2">
                <span>⚠️</span> <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-2xl flex items-center gap-2">
                <span>✅</span> <p className="text-sm font-medium">{success}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-semibold text-gray-700 ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password (min 8 characters)"
                  disabled={loading}
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1 ml-1 flex items-center">
                  <span className="mr-1">⚠️</span> {errors.newPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700 ml-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  disabled={loading}
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 ml-1 flex items-center">
                  <span className="mr-1">⚠️</span> {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !formData.newPassword || !formData.confirmPassword}
              className="bg-primary hover:bg-primary/90 text-black w-full py-4 mt-6 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-black"></span>
                  Setting new password...
                </span>
              ) : (
                <>
                  Set New Password
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

export default function SetNewPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetNewPasswordClient />
    </Suspense>
  );
}