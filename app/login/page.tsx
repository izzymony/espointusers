'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from 'next/link'
import { Eye, EyeOff } from "lucide-react"

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
    usernameOrEmail: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }))
  }

  const validateForm = (): FormErrors => {
    const newError: FormErrors = {};
    if (!formData.usernameOrEmail) newError.usernameOrEmail = "Please enter your username or email.";
    if (!formData.password) newError.password = "Please enter your password.";
    return newError
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      setLoading(false);
      return;
    }

    let usernameToUse = formData.usernameOrEmail;

    // If input looks like an email, fetch username
    if (usernameToUse.includes("@")) {
      try {
        const emailRes = await fetch(
          `https://espoint-auth.onrender.com/api/v1.0/accounts_by_email/${encodeURIComponent(usernameToUse)}`,
          { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          }
        );

        if (!emailRes.ok) {
          if (emailRes.status === 404) {
            setErrors({ usernameOrEmail: "No account found with this email address" });
          } else {
            setErrors({ usernameOrEmail: "Failed to verify email. Please try again." });
          }
          setLoading(false);
          return;
        }

        const data = await emailRes.json();
        usernameToUse = data.username || "";
        
        if (!usernameToUse) {
          setErrors({ usernameOrEmail: "No username associated with this email" });
          setLoading(false);
          return;
        }
      } catch (err) {
        setErrors({ usernameOrEmail: "Network error. Please check your connection and try again." });
        setLoading(false);
        return;
      }
    }

    // Now login with username + password
    try {
      const loginRes = await fetch("https://espoint-auth.onrender.com/api/v1.0/auth/token", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username: usernameToUse, 
          password: formData.password 
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setErrors({ password: loginData.detail || "Invalid username or password" });
        setLoading(false);
        return;
      }

      localStorage.setItem("authToken", loginData.access_token);
      setSuccessMessage("Login successful!");
      
      // Optional: Redirect user after successful login
      // router.push('/dashboard');
      router.push('/bookings')
    } catch (err) {
      setErrors({ password: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#ffffff] h-screen mt-18 px-4 '>
       <div className="">
           <Image src={'/espointtower.jpg'} alt="ESPOINT" width={150} height={150} className="mx-auto rounded-md"/>
          </div>
          <h1 className="text-black text-4xl mt-4  font-bold text-center ">Welcome <span className=''>Back</span> </h1>
          <p className="text-black text-[18px] mt-2 font-sm text-center">Sign in to your account to continue</p>
    <div >
      <div className=' mx-auto'>
        <div className='bg-[#fffbed] mt-5 w-full max-w-md mx-auto p-5 border border-gray-300 shadow-lg rounded-md'>
         <h1 className='font-bold text-black text-3xl text-center'>Sign in</h1>
         <p className='py-3 text-center'>Enter your credentials to sign into </p>

          <form onSubmit={handleSubmit} className='py-6'>
            <div className='grid grid-cols-1 gap-6 '>
              <div>
                <label htmlFor="usernameOrEmail" className='text-[#2e2e2e] font-medium py-2'>Username or Email</label>
                <input
                  type="text"
                  placeholder='Enter your  username or email'
                  className='w-full px-3 border-b-1  rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#D4721E9C] focus:ring-2 focus:ring-[#D4721E9C] outline-none'
                  name='usernameOrEmail'
                  id='usernameOrEmail'
                  onChange={handleChange}
                  value={formData.usernameOrEmail}
                />
                {errors.usernameOrEmail && (<p className='text-red-500 text-sm mt-1'>{errors.usernameOrEmail}</p>)}
              </div>
               
              <div>
                <label htmlFor="password" className='text-[#2e2e2e] font-medium py-2'>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='w-full px-3  border-b-1 rounded-md border-gray-300 placeholder:text-[#2e2e2e] p-1 focus:border-[#D4721E9C] focus:ring-2 focus:bg-none focus:ring-[#D4721E9C] outline-none bg-transparent'
                    id='password'
                    onChange={handleChange}
                    value={formData.password}
                    name='password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(v => !v)}
                    className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400'
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18}  className='text-[#2e2e2e]'/> : <Eye size={18}  className='text-[#2e2e2e]'/>}
                  </button>
                </div>
                {errors.password && (<p className="text-red-500 text-sm mt-1 ">{errors.password}</p>)}
              </div>
            </div>
            <div className='py-6'>
              <button 
                className='bg-[#d4731e] w-full text-white p-2 mt-6 rounded-full font-sm flex items-center justify-center' 
                type='submit'
                disabled={loading}
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </div>
            {successMessage && <p className="text-green-600 text-center ">{successMessage}</p>}
            <div className='text-center mt-4'>
             <Link className=' text-[#d17160] mt-4  text-right ' href={'/forget_password'}>Forgot your password?</Link>
              <div className='flex gap-2 text-center items-center justify-center'>
                <p className='text-[#2e2e2e] '>Don&apos;t have an account?</p>
                <Link href={'/signup'} className='text-[#d17160]  gap-2 '>Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login