import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className='bg-white px-4'>
       <div className='mt-30 flex-col-1 justify-center text-center items-center min-h-screen '>
          <h1 className='text-black font-bold text-4xl leading-[3rem]'>Please Check your <span className='text-[#7464fa]'>email for activation link</span></h1>   
                 
           <div className="bg-[#f2f0fd] p-4 rounded-full w-fit flex  mx-auto mb-4 mt-4">
                   <Image
                     src={"/icons8-mail-50.png"}
                     alt="Mail Icon"
                     height={34}
                     width={34}
                   />
                 </div>
       </div>
       
    </div>
  )
}

export default page
