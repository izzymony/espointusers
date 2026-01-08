"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface FormData {
  usernameOrEmail: string;
  password: string;
}

interface FormErrors {
  usernameOrEmail?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loadingMessages = [
    "Signing up...",
    "Please wait...",
    "Checking...",
    "Done!",
  ];
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): FormErrors => {
    const newError: FormErrors = {};
    if (!formData.usernameOrEmail)
      newError.usernameOrEmail = "Please enter your username or email.";
    if (!formData.password) newError.password = "Please enter your password.";
    return newError;
  };

  useEffect(() => {
    if (loading) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage("");
    setErrorMessage("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    let usernameToUse = formData.usernameOrEmail;

    if (usernameToUse.includes("@")) {
      try {
        const emailRes = await fetch(
          `https://espoint-auth.onrender.com/api/v1.0/accounts_by_email/${encodeURIComponent(
            usernameToUse
          )}`
        );
        if (!emailRes.ok) throw new Error("Failed to verify email");

        const data = await emailRes.json();
        usernameToUse = data.username || "";
        if (!usernameToUse)
          throw new Error("No username associated with this email");
      } catch (err) {
        setErrors({ usernameOrEmail: "Could not resolve username from email" });
        setLoading(false);
        return;
      }
    }

    try {
      const loginRes = await fetch(
        "https://espoint-auth.onrender.com/api/v1.0/auth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameToUse,
            password: formData.password,
          }),
        }
      );

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setErrors({
          password: loginData.detail || "Invalid username or password",
        });
        setLoading(false);
        return;
      }

      else {
        let error = "Login failed."
        if (loginData?.detail) {
          error = loginData.detail;

        } else if (loginData?.error) {
          error = loginData.error
        }
        else if (loginData?.msg) {
          error = loginData.msg
        } else if (loginData?.errors && typeof loginData.errors === "object") {

          error = Object.values(loginData.errors).flat().join(" ");
        } else if (Array.isArray(loginData)) {

          error = loginData.join(" ");
        }

        setErrorMessage(error)

      }

      localStorage.setItem("authToken", loginData.access);
      localStorage.setItem("refreshToken", loginData.refresh);

      const userRes = await fetch(
        `https://espoint-auth.onrender.com/api/v1.0/get_user_info/${usernameToUse}`,
        { headers: { Authorization: `Bearer ${loginData.access}` } }
      );

      if (userRes.ok) {
        const userData = await userRes.json();
        if (userData.msg) {
          localStorage.setItem("user", JSON.stringify(userData.msg));
        }
      }



      setSuccessMessage("Login successful!");
      router.push("/services");
    } catch (err) {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 ">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        {/* Left side illustration */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src="/undraw_sign-in_uva0.svg"
            alt="Login Illustration"
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
              Welcome <span className="text-primary">Back</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Sign in to your account to continue
            </p>
          </div>


          <div className="text-center mb-6">
            <Image
              src={"/espointtower.jpg"}
              alt="ESPOINT"
              width={100}
              height={120}
              className="mx-auto rounded-md shadow-md"
            />
          </div>

          <h2 className="text-black text-2xl font-extrabold text-center">
            Sign in
          </h2>
          <p className="text-gray-500 font-medium text-base mt-1 text-center">
            Enter your credentials below
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            {/* Username or Email */}
            <div className="space-y-2">
              <label
                htmlFor="usernameOrEmail"
                className="text-sm font-semibold text-gray-700 ml-1"
              >
                Username or Email
              </label>
              <input
                type="text"
                placeholder="Enter your username or email"
                className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                name="usernameOrEmail"
                id="usernameOrEmail"
                onChange={handleChange}
                value={formData.usernameOrEmail}
              />
              {errors.usernameOrEmail && (
                <p className="text-red-500 text-sm mt-1 ml-1">
                  {errors.usernameOrEmail}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-gray-700 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 border-gray-200 focus:border-primary focus:ring-0 rounded-2xl p-4 transition-all outline-none"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              className="bg-primary hover:bg-primary/90 text-black w-full py-4 mt-6 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-black"></span>
                  {loadingMessage}
                </span>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {successMessage && (
              <p className="text-green-600 text-center font-medium mt-3">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-center font-medium mt-3">{errorMessage}</p>
            )}

            {/* Links */}
            <div className="text-center mt-6 space-y-4">
              <Link
                className="text-gray-600 text-sm font-medium hover:text-black hover:underline transition-all"
                href={"/forget_password"}
              >
                Forgot your password?
              </Link>
              <div className="h-px bg-gray-100 w-full"></div>
              <p className="text-gray-500 text-sm">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
