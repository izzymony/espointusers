"use client";
import React, { useState } from "react";
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
   const router = useRouter()
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
    // Simple email pattern
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

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
      const response = await fetch("https://espoint-auth.onrender.com/api/v1.0/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirm_password: formData.confirmPassword,
          first_name: formData.firstName,
          last_name: formData.lastName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Sign up successful! You may now sign in.");
        router.push('/account_activation')
        // Optionally, reset the form:
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setErrorMessage(data?.detail || data?.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-18">
       <div className="">
                 <Image src={'/espointtower.jpg'} alt="ESPOINT" width={150} height={150} className="mx-auto rounded-md"/>
                </div>
                 <h1 className="text-black text-4xl font-bold text-center ">Create Account</h1>
          <p className="text-[#475569] font-medium text-[17px] mt-2 text-center">
            Sign up for a new account
          </p>
      <div className=" mx-auto">
        <div className="bg-[#fffbed] mt-5 w-full max-w-md mx-auto p-5 border border-gray-300 shadow-lg rounded-md">
          <form onSubmit={handleSubmit} className="py-6">
            <div className="grid grid-cols-1 gap-5 ">
              <div className="flex gap-3">
              <div>
                <label htmlFor="firstName" className="text-[#2e2e2e] font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="text-[#2e2e2e] font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
              </div>
              <div>
                <label htmlFor="username" className="text-[#2e2e2e]font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-[#2e2e2e] font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#D4721E9C] focus:ring-2 focus:ring-[#D4721E9C] outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="text-[#2e2e2e] font-medium">
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
                    className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#D4721E9C] focus:ring-2 focus:ring-[#D4721E9C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#2e2e2e]"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-[#2e2e2e] font-medium">
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
                    className="w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#D4721E9C] focus:ring-2 focus:ring-[#D4721E9C] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#2e2e2e]"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
            <button
              className="bg-[#d4731e] w-full  text-white p-2 mt-6 rounded-full font-sm"
              type="submit"
            >
              Sign Up
            </button>
            {successMessage && (
              <p className="text-green-600 text-center mt-4">{successMessage}</p>
            )}
            <div className="text-center mt-4">
              <div className="flex gap-2 text-center items-center justify-center">
                <p>Already have an account?</p>
                <Link
                  href={"/login"}
                  className="text-[#d17160]  gap-2"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
