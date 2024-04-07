import { Button, TextField } from '@mui/material'
import Link from 'next/link'



function page() {
  return (
    <main className='px-2 max-w-full h-screen flex justify-center items-center bg-zinc-300'>

      <div className='bg-white max-w-md md:max-w-lg w-full space-y-3 px-3 py-10 sm:py-12 sm:px-4 md:p-7 lg:py-12 shadow-md lg:drop-shadow-2xl rounded lg:max-w-2xl '>
        <h1 className='mb-5 font-sans text-center leading-7 font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-900'>Login Page</h1>
        <form className='flex flex-col gap-6 ' action="">
          <div className='space-y-3'>
         <TextField label="Email" required={true} fullWidth type='email' color='secondary' placeholder='Email your email id'></TextField>
         <TextField label="Password" required={true} fullWidth type='password' color='secondary' placeholder='Enter the password'></TextField>
         </div>
         <Button size='large' fullWidth variant='contained' color='secondary' type='submit'>Login</Button>
        </form>
        <div className='text-right'>
          <span className='text-purple-700 font-base text-base'><Link href="/forgot-password">Forgot password? </Link></span>
        </div>
        
      </div>

    </main>
  )
}

export default page