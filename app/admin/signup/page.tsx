"use client"
import { KeyboardEvent } from 'react';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import { toast } from 'sonner';
import { errorHandler } from '@/hooks/useTableHook';
import { useRouter } from "next/navigation"
import {axiosAuth} from '@/app/lib/axios';
import { useAppDispatch } from '@/reduxtoolkit/store/Hooks';



function signupForm() {
  
   
  
  
    const [capslock,setCapsLock] =useState(false)

 
    const router=useRouter()
   const dispatch=useAppDispatch()

    async function onSubmit(event: React.FormEvent<HTMLFormElement >){
      const formData=new FormData(event.currentTarget)
      event.preventDefault()
      // get all formData with for of
      // for (let[key,value] of formData.entries()){
        
      //   {key:value}
      // }
      const username=formData.get("username")
      const email=formData.get("email")
      const password=formData.get("password")
      const confirmPassword=formData.get("confirmPassword")
      const roles=formData.get("roles")
      const isActive=true
      //  console.log(username,email,password,confirmPassword,roles,isActive)
        
        
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
            <TextField name="username"  label="username"  required={true} fullWidth type='text' color='secondary' placeholder='Enter Username'></TextField>
         <TextField  name="email" label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField  onKeyUp={handleKeyPress} name="password" label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'
          ></TextField>
           <TextField  onKeyUp={handleKeyPress}name="confirmPassword"  label="confirmPassword" required={true} fullWidth type='password' color='secondary' placeholder='confirm password'
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

export default signupForm