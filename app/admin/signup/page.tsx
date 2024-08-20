"use client"
import { KeyboardEvent } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'sonner';
import { errorHandler } from '@/hooks/useTableHook';

import { useRouter } from "next/navigation"

import {axiosAuth} from '@/app/lib/axios';
import { AxiosError, isAxiosError } from 'axios';
import { customError } from '@/typescript.definations';
import useTableHook from '@/hooks/useTableHook';
import { useAppDispatch } from '@/reduxtoolkit/store/Hooks';
import { handleUserRoles } from '@/reduxtoolkit/features/userSlice';

type props={
  callbackUrl?:string
}

function LoginForm({callbackUrl}:props) {

 
  
  
  
    
    const [userDetail,setUserDetail] =useState({
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
      roles:"",
      isActive:true
    })
    console.log(userDetail)
    // const [password,setPassword] =useState("")
    const [capslock,setCapsLock] =useState(false)

   function onChange(event:React.ChangeEvent<HTMLFormElement>){
     setUserDetail({...userDetail,[event.target.name]: event.target.value})
   }
    const router=useRouter()
   const dispatch=useAppDispatch()
   const{ username,email,password,confirmPassword,roles,isActive}=userDetail
    async function onSubmit(event: React.FormEvent<HTMLFormElement | HTMLInputElement | HTMLTextAreaElement>){
      
        event.preventDefault()
        
        try {
          const response=await axiosAuth.post("auth/signup",{
          username,email,password,confirmPassword,roles,isActive
          
        
        })
         if(response.data){
          toast.success(`user has been created`)
          setTimeout(()=>{
           router.push("/admin")
          },1500)
          
         }
       
          
        } catch (error) {
        
          errorHandler(error)
       
      }
 
}
 function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    
    setCapsLock(event.getModifierState('CapsLock'))
   
    
    
  }
  return (
    <main className='px-2 max-w-full h-screen flex justify-center items-center bg-zinc-600'>

      <div className='bg-zinc-100 max-w-md md:max-w-lg w-full space-y-3 px-3 py-10 sm:py-12 sm:px-4 md:p-7 lg:py-12 shadow-md lg:drop-shadow-2xl rounded lg:max-w-2xl '>
        <h1 className='mb-5 font-sans text-center leading-7 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-900'>create new user</h1>
        <form  onSubmit={onSubmit} className='flex flex-col gap-6 ' action="">
          <div className='space-y-3'>
            <TextField name="username" onKeyUp={handleKeyPress} onChange={onChange} value={username} label="username" required={true} fullWidth type='text' color='secondary' placeholder='Enter Username'></TextField>
         <TextField onKeyUp={handleKeyPress} onChange={onChange} name="email" value={email} label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField  onKeyUp={handleKeyPress} onChange={onChange} name="password" value={password} label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'
          ></TextField>
           <TextField  onKeyUp={handleKeyPress} onChange={onChange} name="confirmPassword"  value={confirmPassword} label=" confirmPassword" required={true} fullWidth type='password' color='secondary' placeholder='confirm password'
          ></TextField>
          <div onKeyUp={handleKeyPress} className=' text-right px-2 py-2 text-xs'>
           {
            capslock?<span className=' text-red-600'>Caps Lock is <strong className='text-red-700'>ON</strong></span>:<span className=' text-green-800'>Capslock is <strong className='text-green-950-700'>OFF</strong></span>
           }
          </div>
             <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Select User Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="roles"
        onChange={onChange}
        
      >
        <FormControlLabel value="user" control={<Radio />} label="User" />
        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        <FormControlLabel value="root" control={<Radio />} label="Super Admin" />
       
      </RadioGroup>
    </FormControl>
     <Button size='large' fullWidth variant='contained' color='secondary' type='submit'>create User</Button>
         </div>
        
       
        </form>
        <div className='text-right'>
          <span className='text-purple-700 font-base text-base'><Link href="/admin">back to dashboard </Link></span>
        </div>
        
      </div>
     

    </main>
  )
}

export default LoginForm