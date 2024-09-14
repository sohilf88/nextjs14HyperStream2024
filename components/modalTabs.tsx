"use client"
import { axiosAuth } from "@/app/lib/axios"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { errorHandler } from "@/hooks/useTableHook"
import { userDetail } from "@/typescript.definations"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { toast } from "sonner"


export type user={id:string,username:string,email:string,roles:string}

type propsType={
    userData:user,
    
    open:Boolean,
    setIsopen:Dispatch<SetStateAction<boolean>>,
    getAllUsers:()=>{}
}

const roleAndAttribute:{label:string,value:string,accessType:string,description:string}[]=[
    {
        label:"Super Admin",
        value:"root",
        
        accessType:"Read,Write and Delete",
        description:"Entire Application"
    },
    {
        label:"Admin",
        value:"admin",
        
        accessType:"Read,Write and Delete",
        description:"Own Camera DashBoard"
    },
    {
        label:"User",
        value:"user",
        
        accessType:"Read only",
        description:"User Camera DashBoard"
    }
]
export default function ChangeProfile({open,setIsopen,userData,getAllUsers}:any) {
    const router=useRouter()
    
    const [profile,setProfile]=useState({
        username:userData.username,
        email:userData.email,
        roles:userData.roles,
        id:userData.id
      
    })
    const [value,setValue]=useState<string |null>(profile.roles)
     const [password,setPassword]=useState({
        
        new:"",
        confirmNew:"",
      
       
    })
   

    // console.log(profile)
    // handle profile detail only
    function onChange(event: React.ChangeEvent<HTMLInputElement>){
       
         setProfile({...profile, [event.target.id]: event.target.value})
    }
    function onChangePassword(event: React.ChangeEvent<HTMLInputElement>){
       
         setPassword({...password, [event.target.id]: event.target.value})
    }
  //  password update function
    async function handlePasswordFormSubmit(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()
      try {
        // console.log(id)
        // console.log(profile.id)
        const response=await axiosAuth.patch(`/admin/users/update-password/${profile.id}`,{
          
          password:password.new,
          confirmPassword:password.confirmNew

        })
        console.log(response)

        if(response.data.success){
          toast.success(response.data?.message)
          setIsopen(!open)
          setTimeout(()=>{
           router.push("/admin")
          },1200)
        }
      } catch (error) {
        errorHandler(error)
         
        
      }

    }
    // console.log(value)

     async function handleUserForm(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()
      try {
        const response=await axiosAuth.patch(`/admin/users/${profile.id}`,{
          username:profile.username,
          roles:value

        })
        

        if(response.data){
          toast.success("Profile updated")
          getAllUsers()
          setIsopen(!open)
          setTimeout(()=>{
          
           router.push("/admin")
          },1200)
        }
      } catch (error) {
        errorHandler(error)
         
        
      }
    }
  return (
    <div className="backdrop-blur-sm backdrop-opacity-70 text-base w-screen h-screen flex items-center justify-center ">
    
    <Tabs defaultValue="account" className="max-w-xl w-full mx-2 md:mx-0 ">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger className="" value="account">account</TabsTrigger>
        <TabsTrigger value="password">password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          
          </CardHeader>
          <form onSubmit={handleUserForm}>
          <CardContent className="space-y-2">
            
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input onChange={onChange} required id="username" defaultValue={profile.username} />
            </div>
            <div className="space-y-1">
             
                 <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white"><strong>User Roles </strong></h3>
<ul className="grid w-full gap-6 md:grid-cols-2">

    {roleAndAttribute.map((item)=>(
        <li key={item.value}>
        <input type="radio" id={item.label} name="roles" value={item.value} className="hidden peer" required checked={value===item.value}
        onChange={(e)=>setValue(e.target.value)}
        
        />
        <label htmlFor={item.label} className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
                <div className="w-full text-lg font-semibold">{item.label}</div>
                <div className="w-full">
                    <div>{item.accessType}</div>
                    <div>{item.description}</div>
                </div>
            </div>
            <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </label>
    </li>

    ))}
    
   
</ul>
              {/* <RadioBtn profile={profile} onChange={onChange} roles={profile.roles}/> */}
             
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input disabled onChange={onChange} required id="email" defaultValue={profile.email} />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1">Save Changes</Button>
            <Button type="button" onClick={()=>setIsopen(false)} className="bg-red-500 border-red-200 hover:bg-red-600 ">Cancel</Button>
            
          </CardFooter>
          </form>
        </Card>
         
      </TabsContent>
     
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here...
            </CardDescription>
          </CardHeader>
          <form onSubmit={handlePasswordFormSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input disabled onChange={onChangePassword} id="current" type="password"  />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" >New password</Label>
              <Input required  onChange={onChangePassword} id="new" type="password"  value={password.new}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmNew">Confirm Password</Label>
              <Input required  onChange={onChangePassword} id="confirmNew" type="password" value={password.confirmNew} />
            </div>
          </CardContent>
        <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1">Save password</Button>
            
            <Button type="button" onClick={()=>setIsopen(false)}  className="bg-red-500 border-red-200 hover:bg-red-600 ">Cancel</Button>
            
          </CardFooter>
          
           </form>
        </Card>
      </TabsContent>
      
    </Tabs> 
    </div>
  )

}

