'use client'
import React, { useState } from 'react'
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
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return;
    }
    setSuccessMessage('Login successful!');
    // Proceed with login process...
  }

  return (
    <div className='bg-white h-[100vh]'>
      <div className='flex min-h-screen justify-center items-center p-4'>
        <div className='bg-[#f5f5f5] w-full max-w-md p-5 border border-gray-300 shadow-lg rounded-md'>
          <div className="mx-auto">
            <Image src={"/espointtower.jpg"} alt="" width={150} height={150} className="py-3 mx-auto rounded-md " />
          </div>
          <h1 className="text-[#475569] text-3xl  font-bold text-center ">Welcome Back</h1>
          <p className="text-[#475569] font-medium text-[17px] mt-2 text-center">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className='py-6'>
            <div className='grid grid-cols-1 gap-6 '>
              <div>
                <label htmlFor="usernameOrEmail" className='text-black font-medium'>Username or Email</label>
                <input
                  type="text"
                  placeholder='Enter your  username or email'
                  className='w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-gray-400 p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none'
                  name='usernameOrEmail'
                  id='usernameOrEmail'
                  onChange={handleChange}
                  value={formData.usernameOrEmail}
                />
                {errors.usernameOrEmail && (<p className='text-red-500 text-sm mt-1'>{errors.usernameOrEmail}</p>)}
              </div>
              <div>
                <label htmlFor="password" className='text-black font-medium'>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    className='w-full px-3 border-b-1 rounded-md border-gray-300 placeholder:text-gray-400 p-1 focus:border-[#ffd700] focus:ring-2 focus:ring-[#ffd700] outline-none'
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (<p className="text-red-500 text-sm mt-1 ">{errors.password}</p>)}
              </div>
            </div>
            <button className='bg-[#FFD700] w-full text-black p-2 mt-6 rounded-md font-bold' type='submit'>Sign in</button>
            {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
            <div className='text-center mt-4'>
              <Link className=' text-[#ffd700] underline mt-3 text-center ' href={''}>Forgot your password?</Link>
              <div className='flex gap-2 text-center items-center justify-center'>
                <p>Don't have an account?</p>
                <Link href={'/signup'} className='text-[#ffd700] underline gap-2 '>Sign up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login