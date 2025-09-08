"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, RefreshCw } from "lucide-react";
const AccountActivationClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uidb64");
  const token = searchParams.get("token");

  const handleActivate = async () => {
    if (!uidb64 || !token) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(`https://espoint-auth.onrender.com/api/v1.0/auth/activate_account/uidb64/token/${uidb64}/${token}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      if (response.ok) {
        setSuccess("Your account has been successfully activated! You can now log in.");
      } else {
        const data = await response.json().catch(() => ({}));
        setError(data?.message || "Activation link is invalid or has expired. Please request a new activation email.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setError("");
    setSuccess("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess("A new activation link has been sent to your email.");
    }, 1600);
  };

  return (
    <div className="bg-[#ffffff]  mt-18 px-4 ">
      <Image
        src={"/espointtower.jpg"}
        alt=""
        width={110}
        height={110}
        className="mx-auto rounded-md "/>
      <div className="bg-[#faf0e8] p-4 rounded-full w-fit flex mx-auto mb-4 mt-4">
        <Image src={'/icons8-mail-50.png'} alt="" height={34} width={34} className=""/>
      </div>
      <h1 className="text-black text-center font-bold text-3xl">Activate Your Account</h1>
      <p className="text-black mt-3 font-sm text-[18px] text-center md:text-4xl">A link will be sent to your provided email for activation </p>
      <div className=" ">
        <div className="bg-[#fffbed] py-3 w-full max-w-md p-5 border border-gray-300 shadow-lg rounded-md mt-5 mx-auto">
          <div className="py-5">
            <h1 className="text-black text-2xl font-bold text-center mb-2"> Account Activation</h1>

            {loading && (<p className="text-blue-600 text-center mb-4">Activating your account...</p>)}
            {!loading && success && (<p className="text-green-600 text-center mb-2">{success}</p>)}
            {!loading && error && (<p className="text-red-600 text-center mb-2">{error}</p>)}
            {!uidb64 || !token ? (
              <p className="text-black text-[16px] mb-4 text-center">
                Invalid activation link. Please check your email for the correct activation link or contact support.
              </p>
            ) : null}

            {success && (<p className="text-green-600 text-center mb-2">{success}</p>)}
            {error && (<p className="text-red-600 text-center mb-2">{error}</p>)}

               <button
              className="w-full bg-[#d4731e] hover:bg-[#d4731e] text-white font-medium py-2.5 rounded flex items-center justify-center mb-4"
              onClick={handleActivate}
              disabled={!uidb64 || !token || loading || !!success}
              style={{opacity: (!uidb64 || !token || loading || !!success) ? 0.6 : 1, pointerEvents: (!uidb64 || !token || loading || !!success) ? 'none' : 'auto'}}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                  Activating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Activate Account
                </>
              )}
            </button>

            <p className="text-black font-sm "></p>
            
             <div className=" text-center space-y-3">
              <p className="text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
              <button onClick={handleResend}  className="border-1 p-1 px-2 flex border mx-auto hover:bg-muted bg-transparent outline">
                <RefreshCw className="w-4 h-4 mr-2 mt-1" />
                Resend Code
              </button>
            </div>
            <div className="text-center mt-4">
              <Link href="/login" className="text-[#d4731e] underline">Back to Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivationClient;
