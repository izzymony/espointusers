"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const AccountActivation = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Simulated resend
  const handleResend = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("A new activation link has been sent to your email.");
      setEmailSent(true);
    }, 1600);
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
          <h1 className="text-[#475569] text-2xl font-bold text-center mb-2">Activate Your Account</h1>
          <p className="text-[#475569] text-[16px] mb-4 text-center">
            We have sent you an account activation link via email. Please check your inbox and follow the instructions to activate your account.<br/>
            (If you haven't received the email, you can resend the activation link below.)
          </p>

          {success && (<p className="text-green-600 text-center mb-2">{success}</p>)}
          {error && (<p className="text-red-600 text-center mb-2">{error}</p>)}
          <button
            onClick={handleResend}
            disabled={loading}
            className="bg-[#FFD700] w-full text-black p-2 mt-2 rounded-md font-bold mb-2"
          >
            {loading ? "Resending..." : "Resend Activation Email"}
          </button>
          <div className="text-center mt-4">
            <Link href="/login" className="text-[#ffd700] underline">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivation;
