"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const SetNewPassword = () => {
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
    
    if (!validate()) return;
    
    setLoading(true);

    try {
      const response = await fetch(`https://espoint-auth-8r6v.onrender.com/api/v1.0/change_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          new_password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSuccess("Your password has been changed successfully!");
        setFormData({ newPassword: "", confirmPassword: "" });
        setErrors({ newPassword: "", confirmPassword: "" });
      } else {
        setError(data?.message || data?.error || "Failed to change password. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50 flex flex-col items-center justify-center px-4 py-8">
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
          src="/icons8-lock-48.png"
          alt="Lock Icon"
          height={36}
          width={36}
          className="mx-auto"
        />
      </div>

      {/* Title and Description */}
      <div className="text-center mb-8 max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Set New Password
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Enter your new password below. Make sure it&apos;s strong and memorable.
        </p>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              <p className="text-sm flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </p>
            </div>
          )}
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
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
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-[#7464fa] transition-colors"
                tabIndex={-1}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                disabled={loading}
                className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-[#7464fa] transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span> {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !formData.newPassword || !formData.confirmPassword}
            className="w-full bg-[#7464fa] hover:bg-[#5a4fd0] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting new password...
              </span>
            ) : (
              "Set New Password"
            )}
          </button>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              <p className="text-sm text-center flex items-center justify-center">
                <span className="mr-2">✅</span> {success}
              </p>
            </div>
          )}

          <div className="text-center pt-4">
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
        Passwords must be at least 8 characters. For security, use a mix of letters, numbers, and symbols.
      </p>
    </div>
  );
};

export default SetNewPassword;