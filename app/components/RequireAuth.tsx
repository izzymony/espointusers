import React from 'react'
import { useEffect, useState } from 'react'
import Loader from './Loading'
import { useRouter } from 'next/navigation'


export default function RequireAuth({children}: {children:React.ReactNode}){
  const router = useRouter()     
  const [checking, setChecking] = useState(true);
  
  useEffect(()=>{
    const token = localStorage.getItem("authToken")
    if(!token){
      router.push('/login');        
    } else{
       setChecking(false);       
    }         
  }, [router]);

  if(checking){
     return (
      <div className="flex h-screen justify-center items-center">
        <Loader />
      </div>
    );          
  }
  return<>{children}</>
}


