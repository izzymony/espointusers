"use client";
import React, { useState , useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const AccountActivation = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");


  useEffect(() => {
    if(uidb64 && token){
      setLoading;(true);
      setError("");
      setSuccess("");
      fetch(`https://espoint-auth.onrender.com/api/v1.0/auth/activate_account/uidb64/token/${uidb64}/${token}`, {
        method:"GET",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          uidb64: uidb64,
          token: token
        })
       
      })
      .then((res) => {
        if(res.ok){
          setSuccess("Your account has been successfully activated! You can now log in.");
          setLoading(false);
        } else{
          setError("Activation link is invalid or has expired. Please request a new activation email.");
          setLoading(false);
          setSuccess("")
        }
      })
      .catch(() => {
        setError("Network error. Please try again later.");
        setLoading(false);
        setSuccess("")
      })
      .finally(()=>{
        setLoading(false);
      })
    }
  }, [uidb64, token]);
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
    <div className="bg-[#ffffff] h-[100vh]">
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
            {loading && (<p className="text-blue-600 text-center mb-4">Activating your account...</p>)}
          {!loading && success && (<p className="text-green-600 text-center mb-2">{success}</p>)}
          {!loading && error && (<p className="text-red-600 text-center mb-2">{error}</p>)}
          {!uidb64 || !token ? (
            <p className="text-[#475569] text-[16px] mb-4 text-center">
              Invalid activation link. Please check your email for the correct activation link or contact support.
            </p>
          ) : null}

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
