"use client"
import axios from '@/app/lib/axios'

import { errorHandler } from '@/hooks/useTableHook'
import { Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

 function forgotPassword() {
  // const [email,setEmail]=useState("")
  const router=useRouter()
  
  async function formSubmit(formdata: FormData){
    const email=formdata.get("email")
    
    try {
      
    
    const {data}=await axios.post("/auth/forgot-password",{email})
    // console.log(data)
    if(data.success){
      toast.success(data.message)
      setTimeout(()=>{
      router.push("/auth/reset-password")
      },1000)

    }
    } catch (error:unknown) {
      // console.log(error)
      
      errorHandler(error)
    }
    


  }

  function FormComponent(){
    const {pending}=useFormStatus()
    return(
      <div className="flex flex-col mt-6 gap-4">
      
      <Typography variant="h6" color={'purple'}>Forgot password?</Typography>
      <TextField  required={true} type='email' name="email" color='secondary' fullWidth  label="E-mail address" variant="outlined" />
      {/* below div is used to add padding only */}
      <div className="pb-2"></div> 
      <Button disabled={pending} type='submit' variant='contained' color='secondary' size='large'>{pending?"please wait....":"Submit"}</Button>
       <span className='text-purple-700 font-light text-base text-right'><Link href="/auth/login">Return to Login </Link></span>
      
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center w-full h-screen">
      
    <div className="lg:max-w-2xl md:max-w-xl sm:max-w-md w-full py-4 px-8 h-72   bg-white rounded shadow-2xl">
      
  <form action={formSubmit} >
    
   <FormComponent/>
      
  </form>
</div>
</div>
  )
}

export default forgotPassword