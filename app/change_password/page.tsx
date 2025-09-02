"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const validate = () => {
    let valid = true;
    const errs = { newPassword: "", confirmPassword: "" };
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
    if (!validate()) return;
    setLoading(true);
    // TODO: Post to endpoint...
    setTimeout(() => {
      setSuccess("Your password has been changed successfully!");
      setFormData({ newPassword: "", confirmPassword: "" });
      setLoading(false);
    }, 1500);
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
          <h1 className="text-[#475569] text-2xl font-bold text-center">Change Password</h1>
          <p className="text-[#475569] text-[16px] mt-2 text-center mb-4">
            Enter your new password below.
          </p>
          <form onSubmit={handleSubmit} className="py-2">
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
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-gray-400 p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
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
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-gray-400 p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
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
              className="bg-[#FFD700] w-full text-black p-2 mt-2 rounded-md font-bold"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
            {success && (
              <p className="text-green-600 text-center mt-4">{success}</p>
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
