import { Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-zinc-300">
      
    <div className="lg:max-w-2xl md:max-w-xl sm:max-w-md w-full py-4 px-8  bg-white rounded shadow-2xl mx-1">
      
  <form action="">
    
    <div className="flex flex-col mt-6 gap-4 ">
      
      <Typography sx={{textAlign:"center"}} variant="h5" color={'purple'}>Reset password?</Typography>
      <TextField required={true} type='password' color='secondary' fullWidth id="standard-basic" label="password" variant="outlined" />
      <TextField required={true} type='password' color='secondary' fullWidth id="standard-basic" label="confirm password" variant="outlined" />
      {/* below div is used to add padding only */}
      <div className="pb-2"></div> 
      <Button type='submit' variant='contained' color='secondary' size='large'>submit</Button>
       <span className='text-purple-700 font-light text-base text-right'><Link href="/login">Return to Login </Link></span>
      </div>
      
  </form>
</div>
</div>
  )
}

export default page