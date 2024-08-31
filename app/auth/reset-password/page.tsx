"use client"
import axios from '@/app/lib/axios'
import { errorHandler } from '@/hooks/useTableHook'
import { Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function page() {
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  async function formSubmit(e: React.ChangeEvent< HTMLFormElement>){
    try {
      e.preventDefault()
    const {data}=await axios.patch("/auth/reset-password",{password,confirmPassword})
    console.log(data)
    if(data.success){
      toast.info(data.message)
    }
    } catch (error:unknown) {
      console.log(error)
      errorHandler(error)
    }
    


  }
  return (
    <div className="flex justify-center items-center w-full h-screen bg-zinc-300">
      
    <div className="lg:max-w-2xl md:max-w-xl sm:max-w-md w-full py-4 px-8  bg-white rounded shadow-2xl mx-1">
      
  <form onSubmit={formSubmit}>
    
    <div className="flex flex-col mt-6 gap-4 ">
      
      
      <Typography sx={{textAlign:"center"}} variant="h5"  color={'purple'}>Reset password?</Typography>
       <TextField onChange={(e)=>setPassword(e.target.value)} value={password} required={true} type='password' color='secondary' fullWidth id="standard-basic" label="Token" variant="outlined" />
      <TextField onChange={(e)=>setPassword(e.target.value)} value={password} required={true} type='password' color='secondary' fullWidth id="standard-basic" label="Password" variant="outlined" />
      <TextField onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} required={true} type='password' color='secondary' fullWidth id="standard-basic" label="Confirm Password" variant="outlined" />
      <br />
      {
       password!==confirmPassword ?<span className='text-xs text-red-600'>password does not match</span>:null
      }
      
      {/* below div is used to add padding only */}
      <div className="pb-2"></div> 
      <Button type='submit' variant='contained' color='secondary' size='large'>submit</Button>
      
       <span className='text-purple-700 font-light text-base text-right'><Link href="/auth/login">Return to Login </Link></span>
      </div>
      
  </form>
</div>
</div>
  )
}

export default page