"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password.";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://espoint-auth.onrender.com/api/v1.0/auth/register_no",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
            first_name: formData.firstName,
            last_name: formData.lastName,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Sign up successful! You may now sign in.");
        router.push('/message')
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }else {

  let error = "Registration failed.";
  if (data?.detail) {
    error = data.detail;
  } else if (data?.error) {
    error = data.error;
  } else if (data?.msg) {
    error = data.msg;
  } else if (data?.errors && typeof data.errors === "object") {
   
    error = Object.values(data.errors).flat().join(" ");
  } else if (Array.isArray(data)) {
    
    error = data.join(" ");
  }
  setErrorMessage(error);
}
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#7464fa] flex items-center justify-center px-6 py-12 opacity-20">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-10">
        {/* Left side image */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
          <Image
            src="/undraw_sign-up_qamz.svg"
            alt="Signup Illustration"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Right side form */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-[#7464fa]">
              Welcome
            </h1>
            <p className="text-gray-600 mt-2">
              Let’s get you started with your new account
            </p>
          </div>

          {/* Logo */}
          <div className="text-center mb-6">
            <Image
              src={"/espointtower.jpg"}
              alt="ESPOINT"
              width={120}
              height={150}
              className="mx-auto rounded-md shadow-md"
            />
          </div>

          <h2 className="text-[#7464fa] text-2xl font-extrabold text-center">
            Create Account
          </h2>
          <p className="text-gray-600 font-medium text-base mt-2 text-center">
            Sign up for a new account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {/* First & Last name */}
            <div className="flex gap-3">
              <div className="w-1/2">
                <label htmlFor="firstName" className="text-gray-700 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="text-gray-700 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 placeholder:text-gray-400 focus:border-[#7464fa] focus:ring-2 focus:ring-[#7464fa] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              className="bg-[#7464fa] w-full text-white py-2 mt-4 rounded-md font-medium hover:bg-[#5c4ed6] transition-colors"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                  {loadingMessage}
                </span>
              ) : (
                "Sign up"
              )}
            </button>

            {successMessage && (
              <p className="text-green-600 text-center mt-3">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-center mt-3">{errorMessage}</p>
            )}

            {/* Already have an account */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#7464fa] font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
