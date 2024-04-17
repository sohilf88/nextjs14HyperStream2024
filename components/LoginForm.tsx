"use client"
import { KeyboardEvent } from 'react';
import { Button, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"


import { Bounce, ToastContainer, toast } from "react-toastify"
import { useRouter } from "next/navigation"

import {axiosAuth} from '@/app/lib/axios';

type props={
  callbackUrl?:string
}

function LoginForm({callbackUrl}:props) {
  
  
  
    
    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")
    const [capslock,setCapsLock] =useState(false)
    const [maxAttempt,setMaxAttempt] =useState(1)
    const router=useRouter()
    // console.log(callbackUrl)
    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const response=await axiosAuth.post("auth/login",{
          email,password
        },{"withCredentials":true})

        console.log(response.data)
//         try {
//           const res= await signIn("credentials",{
//             redirect:false,
//             email,password,
            
            
//           })
//           console.log(res)
//           if(!res?.error){
//              router.push("/")

//           }
//           if(res?.error==="CredentialsSignin"){
//             setMaxAttempt(maxAttempt+1)
//             toast.error(`Invalid E-mail or Password,  Login Attempt: ${maxAttempt}/5`)
            
//             if(maxAttempt===3){
              
//               toast.warning(`Account will get Blocked on 5th Attempt  `)
              
//             }
//           }
//           if(res?.error==="Configuration"){
//             setMaxAttempt(1)
            
//             toast.info('🦄IP Address  Blocked for 2 min', {
// position: "top-center",
// autoClose: 120000,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: false,
// draggable: true,
// progress: undefined,
// theme: "light",
// transition:Bounce,
// });
//           }
          
        
       
          
//         } catch (error) {
//           console.log(error)

//          if(error instanceof AuthError){
//           switch(error.type){
//             case "CredentialsSignin":
//               return toast.error("invalid credentials or Email Id")

//             default:
//                return toast.error("Unknown error")
//           } 
          

          
//          }
          
        
        
        
        

    

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    
    setCapsLock(event.getModifierState('CapsLock'))
   
    
    
  }
}
  return (
    <main className='px-2 max-w-full h-screen flex justify-center items-center bg-zinc-300'>

      <div className='bg-white max-w-md md:max-w-lg w-full space-y-3 px-3 py-10 sm:py-12 sm:px-4 md:p-7 lg:py-12 shadow-md lg:drop-shadow-2xl rounded lg:max-w-2xl '>
        <h1 className='mb-5 font-sans text-center leading-7 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-900'>Login Page</h1>
        <form  onSubmit={onSubmit} className='flex flex-col gap-6 ' action="">
          <div className='space-y-3'>
         <TextField onChange={(e)=>setEmail(e.target.value)} value={email} label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField onChange={(e)=>setPassword(e.target.value)} value={password} label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'
          ></TextField>
          <div className=' text-right px-2 py-2 text-xs'>
           {
            capslock?<span className=' text-red-600'>Caps Lock is <strong className='text-red-700'>ON</strong></span>:<span className=' text-green-800'>Capslock is <strong className='text-green-950-700'>OFF</strong></span>
           }
          </div>
          
         </div>
         <Button size='large' fullWidth variant='contained' color='secondary' type='submit'>Login</Button>
        </form>
        <div className='text-right'>
          <span className='text-purple-700 font-base text-base'><Link href="/forgot-password">Forgot password? </Link></span>
        </div>
        
      </div>
      <ToastContainer/>

    </main>
  )
}

export default LoginForm