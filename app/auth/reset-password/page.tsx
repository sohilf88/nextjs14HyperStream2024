"use client"
import axios from '@/app/lib/axios'
import { errorHandler } from '@/hooks/useTableHook'
import { Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

function page() {
  // const [password,setPassword]=useState("")
  // const [confirmPassword,setConfirmPassword]=useState("")
  async function formSubmit(formData:FormData){
    try {
      const token=formData.get("token")
      const password=formData.get("password")
      const confirmPassword=formData.get("confirmPassword")

    const {data}=await axios.post("/auth/reset-password",{token,password,confirmPassword})
    console.log(data)
    if(data.success){
      toast.info(data.message)
    }
    } catch (error:unknown) {
      // console.log(error)
      errorHandler(error)
    }
    


  }


  const FormComponent=()=>{
    const {pending,data}=useFormStatus()
    return(
      <div className="flex flex-col mt-6 gap-4  ">
      
      
      <Typography sx={{textAlign:"center"}} variant="h5"   color={'purple'}>Reset password?</Typography>
       <TextField required={true} type='password' color='secondary' name="token" fullWidth id="standard-basic" label="Token" variant="outlined" />
      <TextField  required={true} type='password' color='secondary' name="password" fullWidth id="standard-basic" label="Password" variant="outlined" />
      <TextField required={true} type='password' color='secondary' name="confirmPassword" fullWidth id="standard-basic" label="Confirm Password" variant="outlined" />
      <br />
      {
       data?.get("password")!==data?.get("confirmPassword") ?<span className='text-xs text-red-600'>password does not match</span>:null
      }
      
      {/* below div is used to add padding only */}
      <div className="pb-2"></div> 
      <Button type='submit' variant='contained' color='secondary' size='large'>submit</Button>
      
       <span className='text-purple-700 font-light text-base text-right'><Link href="/auth/login">Return to Login </Link></span>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center w-full h-screen bg-zinc-300">
      
    <div className="lg:max-w-2xl md:max-w-xl sm:max-w-md w-full py-4 px-8  bg-white rounded shadow-2xl mx-1">
      
  <form action={formSubmit}>
    
    <FormComponent/>
      
  </form>
</div>
</div>
  )
}

export default page