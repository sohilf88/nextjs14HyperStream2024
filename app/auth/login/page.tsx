"use client"
import { axiosAuth } from "@/app/lib/axios"
import { errorHandler } from "@/hooks/useTableHook"
import Link from "next/link"
import {   useRouter } from "next/navigation"
import {z} from "zod"
import { useAppDispatch } from '@/reduxtoolkit/store/Hooks';
import { handleUserRoles } from '@/reduxtoolkit/features/userSlice';
import { toast } from "sonner"
function Login() {
  const dispatch=useAppDispatch()
 const router=useRouter()
  const userSchema=z.object({
    email:z.string().email(),
    password:z.string().min(5).max(15)
  })
async function onSubmit(event:React.FormEvent<HTMLFormElement>){
 
      event.preventDefault()
      const formData=new FormData(event.currentTarget)
      
      const email=formData.get("email")
      const password=formData.get("password")
      const safeData=userSchema.safeParse({email,password})
      console.log(safeData.success)
      if(!safeData.success) return toast.error("Enter Valid Email and Passowrd")
      try {
        const response=await axiosAuth.post("/auth/login",{email,password})
        // console.log(response.data)
        if(response.data){
          dispatch(handleUserRoles(response.data.data.roles))
          if(response.data?.data?.roles==="root"){
           router.push("/admin")
          }else{
            router.push("/dashboard")
          }
         
        }
      } catch (error) {
        errorHandler(error)
      }
      
} 
  return (
   
<form onSubmit={onSubmit} className="min-h-screen bg-gradient-to-r from-zinc-950 to-zinc-300 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-slate-500 to-zinc-800 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-zinc-50 shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl text-zinc-700-800 font-semibold">HyperStream Login Page</h1>
					{/* <h1 className="text-2xl font-semibold text-center">Login Page</h1> */}
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 bg-transparent" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						</div>
						<div className="relative">
							<input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
						</div>
						<div className="relative space-y-5">
							<button className="bg-zinc-500 hover:cursor-pointer hover:bg-zinc-700 text-white rounded-md px-2 py-1">Submit</button>
              <div className="peer-focus:text-sm text-red-600 text-right ">
                <Link className="hover:cursor-pointer text-sm hover:underline " href="/auth/forgot-password">forgot password ?</Link>
              </div>
              
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>
  )
}

export default Login