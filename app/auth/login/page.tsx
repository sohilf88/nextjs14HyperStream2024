"use client"
import { KeyboardEvent } from 'react';
import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'sonner';
import { errorHandler } from '@/hooks/useTableHook';
import Firework from "@/components/firework";
import FourKSharpIcon from '@mui/icons-material/FourKSharp';

import { redirect, useRouter } from "next/navigation"

import {axiosAuth} from '@/app/lib/axios';
import { AxiosError, isAxiosError } from 'axios';
import { customError } from '@/typescript.definations';
import useTableHook from '@/hooks/useTableHook';
import { useAppDispatch,useAppSelector } from '@/reduxtoolkit/store/Hooks';
import { handleUserid, handleUserName, handleUserRoles } from '@/reduxtoolkit/features/userSlice';
import { useFormStatus } from 'react-dom';
import FireworkBackground from '@/components/firework';



export const electionTypes = [
  { id: "lok_sabha", label: "Lok Sabha Election" },
  { id: "rajya_sabha", label: "Rajya Sabha Election" },

  { id: "vidhan_sabha", label: "State Assembly (Vidhan Sabha) Election" },
  { id: "vidhan_parishad", label: "State Legislative Council Election" },

  { id: "municipal_corporation", label: "Municipal Corporation Election" },
  { id: "municipal_council", label: "Municipal Council Election" },
  { id: "nagar_panchayat", label: "Nagar Panchayat Election" },

  { id: "zila_parishad", label: "Zila Parishad Election" },
  { id: "panchayat_samiti", label: "Panchayat Samiti Election" },
  { id: "gram_panchayat", label: "Gram Panchayat Election" }
];


function Login() {
    const router=useRouter()
    const {role,userId}=useAppSelector((store)=>store.root.userRole)
   
// all election type

  
   const dispatch=useAppDispatch()
    async function onSubmit(formData:FormData){
      // const formData=new FormData(event.currentTarget)
      const email=formData.get("email")
      const password=formData.get("password")
    
        try {
          const response=await axiosAuth.post("auth/login",{
          email,password
          
        })
        
        console.log(response.data)
        if(response.data?.success ){
          // console.log(response.data.data.roles.includes("root"))
          
         dispatch(handleUserRoles(response.data.data.roles))
         dispatch(handleUserid(response.data.data.id))
         dispatch(handleUserName(response.data.data.name))
         if(response.data.data.roles==="root"){
          return router.push("/admin")
         }else{
           return router.push("/dashboard")
         }
            
        }
        if(role!==""){
         return router.push("/dashboard")
   }
          
        } catch (error) {
        
          errorHandler(error)
       
      }
 
}
 
  return (
    <form action={onSubmit}>
      <LoginForm/>
    </form>
  )
}


export default Login

function LoginForm() {
  const {pending,data}=useFormStatus()
  const [capslock,setCapsLock] =useState(false)
  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    
    setCapsLock(event.getModifierState('CapsLock'))
   
    
    
  }

return (
  <div>
  {/* <Firework></Firework>   */}
 <main className="h-screen flex justify-center items-center bg-gradient-to-br from-[#FF9933] via-white to-[#138808]">
    <div className="bg-white/90 backdrop-blur-sm border border-gray-100 shadow-xl rounded-2xl w-full max-w-md md:max-w-lg p-8 sm:p-10 space-y-6">
      <h1 className="text-center font-mono text-3xl font-bold bg-gradient-to-r from-[#FF9933] via-[#0A5EB7] to-[#138808] bg-clip-text text-transparent">
        arwaStreaming 
      </h1>
      <h6 className='text-sm text-center text-red-700 font-mono '>Municipal Council Election 2025</h6>

      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <TextField
            name="email"
            label="Email"
            required
            fullWidth
            type="email"
            color="primary"
            placeholder="Enter your email"
          />

          <TextField
            name="password"
            label="Password"
            required
            fullWidth
            type="password"
            color="primary"
            placeholder="Enter your password"
            onKeyUp={handleKeyPress}
          />

          <div className="text-right text-xs text-gray-600">
            {capslock ? (
              <span className="text-red-600">
                Caps Lock is <strong>ON</strong>
              </span>
            ) : (
              <span className="text-green-700">
                Caps Lock is <strong>OFF</strong>
              </span>
            )}
          </div>
        </div>

        <Button
          disabled={pending}
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            py: 1.2,
            background:
              'linear-gradient(90deg, rgba(99,102,241,1) 0%, rgba(139,92,246,1) 100%)',
          }}
        >
          {pending ? 'Loading...' : 'Login'}
        </Button>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  </main>
    </div>
  )
}

