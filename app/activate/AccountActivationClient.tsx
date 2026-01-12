"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, RefreshCw } from "lucide-react";
import { getBaseUrl } from "../utils/api";

const BASE_URL = getBaseUrl();

const AccountActivationClient = () => {
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();


  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  /** 🔑 Handle Account Activation */
  const handleActivate = async () => {
    if (!uidb64 || !token) {
      setError("Invalid activation link. Please check your email again.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `https://espoint-auth-8r6v.onrender.com/api/v1.0/auth/activate_account/${uidb64}/${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setSuccess("Your account has been activated! Redirecting to login...");
        setTimeout(() => {
          router.push("/login"); // ✅ client-side redirect
        }, 2000);
      } else {
        const data = await response.json().catch(() => ({}));
        setError(
          data?.message ||
            data?.detail ||
            "Activation link is invalid or expired. Please request a new one."
        );
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /** 🔄 Handle Resend Activation Link */
  const handleResend = async () => {
    setError("");
    setSuccess("");
    setResending(true);

    const email = sessionStorage.getItem("email"); // ✅ safer than localStorage

    if (!email) {
      setError("No email found. Please sign in first.");
      setResending(false);
      return;
    }

    try {
      const response = await fetch(
        "https://espoint-auth-8r6v.onrender.com/api/v1.0/auth/resend_activation_link",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(
          data?.message || "A new activation link has been sent to your email."
        );
      } else {
        const data = await response.json().catch(() => ({}));
        setError(
          data?.message ||
            data?.detail ||
            "Failed to resend activation link. Please try again later."
        );
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  /** 🚀 Auto-trigger activation on page load if token exists */
  useEffect(() => {
    if (uidb64 && token) {
      handleActivate();
    }
  }, [uidb64, token]);

  return (
    <div className="bg-white mt-20 px-4">
      {/* Logo */}
      <Image
        src={"/espointtower.jpg"}
        alt="EsPoint Tower"
        width={110}
        height={110}
        className="mx-auto rounded-md"
      />

      {/* Mail Icon */}
      <div className="bg-[#f2f0fd] p-4 rounded-full w-fit flex mx-auto mb-4 mt-4">
        <Image
          src={"/icons8-mail-50.png"}
          alt="Mail Icon"
          height={34}
          width={34}
        />
      </div>

      {/* Page Title */}
      <h1 className="text-black text-center font-bold text-3xl">
        Activate Your Account
      </h1>
      <p className="text-gray-700 mt-3 text-lg text-center md:text-2xl">
        We’re verifying your account. If nothing happens, click below.
      </p>

      {/* Activation Box */}
      <div className="bg-[#f9f8ff] py-3 w-full max-w-md p-5 border border-gray-300 shadow-lg rounded-md mt-5 mx-auto">
        <h2 className="text-black text-2xl font-bold text-center mb-4">
          Account Activation
        </h2>

        {/* Status Messages */}
        <StatusMessage type="success" message={success} />
        <StatusMessage type="error" message={error} />
        {loading && (
          <p className="text-[#7464fa] text-center mb-2">
            Processing your activation...
          </p>
        )}

        {/* Activate Button */}
        <button
          className="w-full bg-[#7464fa] hover:bg-[#5e4fd1] text-white font-medium py-2.5 rounded flex items-center justify-center mb-4 transition disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleActivate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner />
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Activate Account
            </>
          )}
        </button>

        {/* Resend Link */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-600">Didn&apos;t receive the link?</p>
          <button
            onClick={handleResend}
            className="bg-primary hover:bg-primary/90 text-black w-full py-4 mt-6 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            disabled={resending}
          >
            {resending ? (
              <>
                <Spinner />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Link
              </>
            )}
          </button>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link href="/login" className="text-[#7464fa] underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

/** 🔹 Small Components */
function StatusMessage({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) {
  if (!message) return null;
  const color = type === "success" ? "text-green-600" : "text-red-600";
  return <p className={`${color} text-center mb-2`}>{message}</p>;
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );
}

export default AccountActivationClient;
