"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
    setError("");
  };

  const validate = () => {
    let valid = true;
    const errs = { oldPassword: "", newPassword: "", confirmPassword: "" };
    if (!formData.oldPassword) {
      errs.oldPassword = "Enter your old password.";
      valid = false;
    }
    if (!formData.newPassword) {
      errs.newPassword = "Enter your new password.";
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
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        })
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        setSuccess("Your password has been changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setError(data?.message || "Failed to change password. Please try again.");
      }
    } catch {
      setLoading(false);
      setError("Network error. Try again later.");
    }
  };

  return (
    <div className="bg-white h-[100vh]">
      <div className="flex min-h-screen justify-center items-center p-4">
        <div className="bg-white shadow-md  w-full max-w-md p-5 border border-gray-300 shadow-lg rounded-md">
          <div className="mx-auto mb-4">
            <Image
              src={"/espointtower.jpg"}
              alt=""
              width={110}
              height={110}
              className="mx-auto rounded-md "/>
          </div>
          <h1 className="text-[#475569] text-2xl font-bold text-center">Change Password</h1>
          <p className="text-[#475569] text-[16px] mt-2 text-center mb-4">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit} className="py-2">
            <div className="mb-4">
              <label htmlFor="oldPassword" className="text-black font-medium">
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter old password"
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="text-black font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-black font-medium">
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
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary w-full text-white p-2 mt-2 rounded-md font-bold"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            {success && (
              <p className="text-green-600 text-center mt-4">{success}</p>
            )}
            {error && (
              <p className="text-red-600 text-center mt-2">{error}</p>
            )}
            <div className="text-center mt-5">
              <Link href="/login" className="text-[#ffd700] underline">Back to Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
