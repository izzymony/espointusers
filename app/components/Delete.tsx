import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from "next/navigation"
import Image from 'next/image'


const Delete = () => {
   const [loading, setLoading] = useState(false);
const [error, setError] = useState('') 
const [success, setSuccess] = useState('');
const router = useRouter();


const handleDelete = async () =>{
setError("")
setSuccess("")

const email = localStorage.getItem("email");
if(email){
  setError("No email found. Please log in first")
  return;            
}

if(
  !confirm(
    "⚠️ Are you sure you want to delete your account? This action cannot be undone."          
  )            
){
return;              
}
setLoading(true);
try{
const response = await fetch(`https://espoint-auth.onrender.com/api/v1.0/auth/delete_account_by_email/${email}`,{
  method:"DELETE",
  headers:{"Content-Type" : "application/json"}  ,          
}) 
if(response.ok){
const data = await response.json().catch(() => ({}));
setSuccess(data?.message || "Your account has been deleted");
localStorage.clear();
setTimeout(() =>{
 router.push("/signup");

},2000);

}  else{
   const data = await response.json().catch(()=>({}));
   setError(data?.message || "Failed to delete account")           
}           
} catch{
   setError("Network error. Please try again.");           
}finally {
      setLoading(false);
    }
}
  return (
    <div>
      <div className="mt-6 text-center">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded disabled:opacity-60"
      >
        {loading ? "Deleting..." : "Delete My Account"}
      </button>
    </div>
    </div>
  )
}

export default Delete
