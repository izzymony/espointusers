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
   


    try{
      const response = await fetch("https://espoint-auth.onrender.com/api/v1.0/forgot_password" ,{
        method: "POST",
        headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({email})
      })
      setLoading(false)
      const data = await response.json();
      if(response.ok){
        setSuccess(data.message || "If an account with that email exists, a password reset link has been sent to it.");
        setEmail("");
      } else{
        setError(data.error || "Failed to send reset link. Please try again.");
      }
    }catch(err){
      setError("Network error. Please check your connection and try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-white  px-4 mt-18">
         <Image
              src={"/espointtower.jpg"}
              alt=""
              width={110}
              height={110}
              className="mx-auto rounded-md "/>
              <div className="bg-[#faf0e8] p-4 rounded-full  w-fit flex mx-auto mb-4 mt-4">
                            <Image src={'/icons8-mail-50.png'} alt=""height={34} width={34} className=""/>
                            </div>
      <h1 className="text-black text-center mt-3 font-bold text-3xl">Forgot Password?</h1>      
      <p className="text-black text-center text-[18px] font-sm mt-2">No worries we&apos;ll send you reset instructions</p>              
      <div className="">
        <div className="bg-[#fffbed] w-full max-w-md p-5 border mt-6 border-gray-300 shadow-lg rounded-md">
          <div className="mx-auto mb-4 py-2">
         
          </div>
          <h1 className="text-2xl font-bold text-center text-black">Forgot Password?</h1>
          <p className="text-black text-sm text-[16px] mt-2 text-center mb-4">
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
                className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
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
              className="bg-[#d4731e] w-full text-white font-sm p-2 mt-2 rounded-full "
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <div className="text-center mt-5">
              <Link href="/login" className="text-[#d4731e] underline">Back to Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;