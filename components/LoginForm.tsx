"use client"
import { KeyboardEvent } from 'react';
import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'sonner';
import { errorHandler } from '@/hooks/useTableHook';

import { useRouter } from "next/navigation"

import {axiosAuth} from '@/app/lib/axios';
import {z} from "zod"

import { useAppDispatch } from '@/reduxtoolkit/store/Hooks';
import { handleUserRoles } from '@/reduxtoolkit/features/userSlice';



function LoginForm() {

  const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(5)
    
  })
 
  

  
    
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [capslock,setCapsLock] =useState(false)

  

 

    const router=useRouter()
   const dispatch=useAppDispatch()
    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
       
    const data=loginSchema.parse({
    email,
    password
  })
  console.log(data)
        event.preventDefault()
        
        try {
          const response=await axiosAuth.post("auth/login",{
          email,password
          
        })
        //  console.log(response)
        if(response.data?.success ){
          // console.log(response.data.data.roles.includes("root"))
         dispatch(handleUserRoles(response.data.data.roles))
         if(response.data.data.roles.includes("root")){
          router.push("/admin")
         }else{
           router.push("/dashboard")
         }
          
          
        }
          
        } catch (error) {
        
          errorHandler(error)
       
      }
 
}
 function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    
    setCapsLock(event.getModifierState('CapsLock'))
   
    
    
  }
  return (
    <main className='px-2 max-w-full h-screen flex justify-center items-center bg-zinc-300'>

      <div className='bg-white max-w-md md:max-w-lg w-full space-y-3 px-3 py-10 sm:py-12 sm:px-4 md:p-7 lg:py-12 shadow-md lg:drop-shadow-2xl rounded lg:max-w-2xl '>
        <h1 className='mb-5 font-sans text-center leading-7 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-900'>Login Page</h1>
        <form  onSubmit={onSubmit} className='flex flex-col gap-6 ' action="">
          <div className='space-y-3'>
         <TextField onKeyUp={handleKeyPress} onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField  onKeyUp={handleKeyPress} onChange={(e)=>setPassword(e.target.value)} value={password} label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'
          ></TextField>
          <div onKeyUp={handleKeyPress} className=' text-right px-2 py-2 text-xs'>
           {
            capslock?<span className=' text-red-600'>Caps Lock is <strong className='text-red-700'>ON</strong></span>:<span className=' text-green-800'>Capslock is <strong className='text-green-950-700'>OFF</strong></span>
           }
          </div>
          
         </div>
         <Button size='large' fullWidth variant='contained' color='secondary' type='submit'>Login</Button>
        </form>
        <div className='text-right'>
          <span className='text-purple-700 font-base text-base'><Link href="/auth/forgot-password">Forgot password? </Link></span>
        </div>
        
      </div>
     

    </main>
  )
}

export default LoginForm