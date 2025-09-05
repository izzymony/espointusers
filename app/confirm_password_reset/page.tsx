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

  try {
      const response = await fetch("https://espoint-auth.onrender.com/api/v1.0/change_password", {
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
      setLoading(false);
      if (response.ok) {
        setSuccess("Your password has been changed successfully!");
        setFormData({  newPassword: "", confirmPassword: "" });
      } else {
        setError(data?.message || "Failed to change password. Please try again.");
      }
    } catch {
      setLoading(false);
      setError("Network error. Try again later.");
    }
    setTimeout(() => {
      setSuccess("Your password has been set successfully!");
      setFormData({ newPassword: "", confirmPassword: "" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white h-screen px-4 mt-18">
      <Image
                    src={"/espointtower.jpg"}
                    alt=""
                    width={110}
                    height={110}
                    className="mx-auto rounded-md "/>
                    <div className="bg-[#faf0e8] p-4 mt-5 rounded-full w-fit flex mx-auto mb-4 mt-4">
                    <Image src={'/icons8-lock-48.png'} alt=""height={36} width={36} className=""/>

                    </div>

                     <h1 className="text-black text-3xl mt-4  font-bold text-center ">Reset Password </h1>
          <p className="text-black text-[18px] mt-2 font-sm text-center">Enter your new password below</p>
      <div className="">
        <div className="bg-[#fffbed] w-full mt-5 max-w-md p-5 border border-gray-300 shadow-lg rounded-md">
          <div className="mx-auto mb-4 py-2">
          </div>
          <h1 className="text-[#475569] text-2xl font-bold text-center text-black">Set New Password</h1>
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
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showNewPassword ? <EyeOff size={18} className="text-[#2e2e2e]" /> : <Eye size={18} className="text-[#2e2e2e]" />}
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
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute text-[#2e2e2e] top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18}  className="text-[#2e2e2e]"/> : <Eye size={18}  className="text-[#2e2e2e]"/>}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d4731e] w-full text-black p-2 mt-2 rounded-full font-sm text-white"
            >
              {loading ? "Setting..." : "Set New Password"}
            </button>
            {success && (
              <p className="text-green-600 text-center mt-4">{success}</p>
            )}
            <div className="text-center mt-5">
              <Link href="/login" className="text-[#d4731e] underline">Back to Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
