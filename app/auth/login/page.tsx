"use client"
import { KeyboardEvent } from 'react';
import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'sonner';
import { errorHandler } from '@/hooks/useTableHook';

import { redirect, useRouter } from "next/navigation"

import {axiosAuth} from '@/app/lib/axios';
import { AxiosError, isAxiosError } from 'axios';
import { customError } from '@/typescript.definations';
import useTableHook from '@/hooks/useTableHook';
import { useAppDispatch,useAppSelector } from '@/reduxtoolkit/store/Hooks';
import { handleUserRoles } from '@/reduxtoolkit/features/userSlice';
import { useFormStatus } from 'react-dom';


function Login() {
    const router=useRouter()
    const {role}=useAppSelector((store)=>store.root.userRole)
   

  
   const dispatch=useAppDispatch()
    async function onSubmit(formData:FormData){
      // const formData=new FormData(event.currentTarget)
      const email=formData.get("email")
      const password=formData.get("password")
    
        try {
          const response=await axiosAuth.post("auth/login",{
          email,password
          
        })
        //  console.log(response)
        if(response.data?.success ){
          // console.log(response.data.data.roles.includes("root"))
          console.log(response.data.data.roles==="root")
         dispatch(handleUserRoles(response.data.data.roles))
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
   
    <main className='bg-zinc-400  px-2 max-w-full h-screen flex justify-center items-center'>

      <div className='bg-white text-fuchsia-900  max-w-md md:max-w-lg w-full space-y-3 px-3 py-10 sm:py-12 sm:px-4 md:p-7 lg:py-12 shadow-md lg:drop-shadow-2xl rounded lg:max-w-2xl '>
        <h1 className='mb-5 text-center leading-7 font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl italic font-caveat'>Hyperstream Login Page</h1>
        <div className='flex flex-col gap-6 ' >
          <div className='space-y-3'>
         <TextField name="email"  label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField name="password"  onKeyUp={handleKeyPress} label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'
          ></TextField>
          <div onKeyUp={handleKeyPress} className=' text-right px-2 py-2 text-xs'>
           {
            capslock?<span className=' text-red-600'>Caps Lock is <strong className='text-red-700'>ON</strong></span>:<span className=' text-green-800'>Capslock is <strong className='text-green-950-700'>OFF</strong></span>
           }
          </div>
          
         </div>
         <Button  disabled={pending} size='large' fullWidth variant='contained' color='secondary' type='submit'>{`${pending ?"Loading...":"Login"}`}</Button>
         
        </div>
        <div className='text-right'>
          <span className='text-purple-600 hover:text-red-600 font-base text-base'><Link href="/auth/forgot-password">Forgot password? </Link></span>
        </div>
        
      </div>
     

    </main>
    </div>
  )
}

