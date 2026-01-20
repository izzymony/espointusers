"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, RefreshCw } from "lucide-react";

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
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 ">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        {/* Left side illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src="/undraw_select_u1sa.svg"
            alt="Activation Illustration"
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
              Account <span className="text-primary">Activation</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              We&apos;re verifying your account to get you started.
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

          <div className="text-center mb-6">
            {!uidb64 && !token ? (
              <>
                <div className="bg-[#f2f0fd] p-6 rounded-full w-fit flex mx-auto mb-6 shadow-inner">
                  <Image
                    src="/icons8-mail-50.png"
                    alt="Mail Icon"
                    height={50}
                    width={50}
                    className="animate-bounce"
                  />
                </div>
                <h2 className="text-black text-2xl font-extrabold text-center">
                  Check your <span className="text-primary">Email</span>
                </h2>
                <p className="text-gray-500 font-medium text-base mt-2 text-center px-4">
                  We&apos;ve sent an activation link to your email address. Please click the link to activate your account.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-black text-2xl font-extrabold text-center">
                  Verify Email
                </h2>
                <p className="text-gray-500 font-medium text-base mt-1 text-center">
                  Activate your account to continue
                </p>
              </>
            )}
          </div>

          <div className="mt-8 space-y-6">
            {/* Status Messages */}
            <div className="space-y-4">
              <StatusMessage type="success" message={success} />
              <StatusMessage type="error" message={error} />

              {loading && !success && !error && (
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-pulse">
                  <Spinner color="text-[#7464fa]" />
                  <p className="text-[#7464fa] font-semibold mt-3">
                    Processing your activation...
                  </p>
                </div>
              )}
            </div>

            {/* Activate Button - Only show if not auto-activating or if it failed */}


            {/* Resend Link Section */}
            <div className="text-center space-y-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 font-medium">Didn&apos;t receive the link?</p>
              <button
                onClick={handleResend}
                className="bg-primary hover:bg-primary/90 text-black w-full py-4 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                disabled={resending}
              >
                {resending ? (
                  <>
                    <Spinner color="text-black" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-1" />
                    Resend Link
                  </>
                )}
              </button>
            </div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link
                href="/login"
                className="text-primary font-bold hover:underline text-sm"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
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
  const bgColor = type === "success" ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100";
  const textColor = type === "success" ? "text-green-700" : "text-red-700";
  const icon = type === "success" ? "✅" : "⚠️";

  return (
    <div className={`p-4 rounded-2xl border ${bgColor} ${textColor} text-center flex items-center justify-center gap-2 font-medium`}>
      <span>{icon}</span> {message}
    </div>
  );
}

function Spinner({ color = "text-white" }: { color?: string }) {
  return (
    <svg
      className={`animate-spin h-5 w-5 ${color}`}
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
