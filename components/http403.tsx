import Link from 'next/link'
import React from 'react'

function AccessDenied() {
  return (
   
   <section className="w-screen h-screen max-h-screen flex justify-center items-center  lg:mx-auto bg-gradient-to-r from-slate-700 to-slate-900 px-5 ">
    <div className="flex flex-col justify-center items-center gap-4 lg:gap-10 max-w-7xl">
     <h1 className="lg:text-7xl text-5xl bg-gradient-to-r from-zinc-100 to-gray-400 bg-clip-text text-transparent font-semibold font-sans"> <span className='font-bold text-6xl md:text-7xl text-yellow-400'><span className='text-lime-300 hidden lg:inline-block'>HTTP/</span>403</span> - ACCESS DENIED</h1>
     <h2 className="lg:text-5xl text-xl text-yellow-50" ><span className="text-yellow-400 font-bold lg:text-7xl text-4xl">LOL🤣</span>, You don't have permission to access this page.</h2>
     <p className='lg:text-xl text-slate-100 max-w-6xl tracking-wider'>A web server may return a 403 Forbidden HTTP status code in response to a request from a client for a web page or resource to indicate that the server can be reached and understood the request, but refuses to take any further action. Status code 403 responses are the result of the web server being configured to deny access, for some reason, to the requested resource by the client.</p>
     <Link className='bg-yellow-400 px-10 py-4 rounded uppercase hover:bg-lime-300 font-semibold' href={"/dashboard"}>go to home</Link>
     </div>
   </section>
  )
}

export default AccessDenied