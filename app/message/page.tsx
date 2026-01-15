import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";

const MessagePage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 ">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        {/* Left side illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src="/undraw_sign-in_uva0.svg"
            alt="Message Illustration"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Right side card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/espointtower.jpg"
              alt="ESPOINT"
              width={100}
              height={120}
              className="mx-auto rounded-md shadow-md"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight">
              Check your <span className="text-primary">Email</span>
            </h1>
            <p className="text-gray-500 mt-4 font-medium text-lg">
              We&apos;ve sent an activation link to your email address.
            </p>
          </div>

          {/* Mail Icon */}
          <div className="bg-[#f2f0fd] p-8 rounded-full w-fit flex mx-auto mb-10 shadow-inner">
            <Image
              src="/icons8-mail-50.png"
              alt="Mail Icon"
              height={60}
              width={60}
              className="animate-bounce"
            />
          </div>

          <p className="text-gray-500 text-center text-sm font-medium mb-8">
            Please click the link in the email to activate your account and get started.
          </p>

          <div className="text-center pt-6 border-t border-gray-100">
            <Link
              href="/login"
              className="text-primary font-bold hover:underline flex items-center justify-center gap-2 group transition-all"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
