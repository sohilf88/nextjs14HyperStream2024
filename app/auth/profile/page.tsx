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
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function userProfile() {
    const router=useRouter()

    const [profile,setProfile]=useState({
        username:"",
        email:"",
        roles:[],
      
       
    })
     const [password,setPassword]=useState({
        current:"",
        new:"",
        confirmNew:"",
      
       
    })
    // fetch data from backend on componenet mount
    const getUserProfileDetail=async()=>{
        try {
        const {data}=await axiosAuth.get("/users/profile")
        
         if(data.success){
            setProfile({
                username:data.message.username,
                email:data.message.email,
                roles:data.message.roles
            })
         }
        } catch (error:unknown) {
            errorHandler(error)
        }
        
    }
    useEffect(()=>{
      getUserProfileDetail()
    },[])
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
        const response=await axiosAuth.patch("/auth/change-password",{
          currentPassword:password.current,
          newPassword:password.new,
          confirmNewPassword:password.confirmNew

        })
        // console.log(response)

        if(response.data.success){
          toast.success(response.data?.message)
          setTimeout(()=>{
           router.push("/dashboard")
          },1200)
        }
      } catch (error) {
        errorHandler(error)
         
        
      }

    }

     async function handleUserForm(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault()
      try {
        const response=await axiosAuth.patch("/users/profile",{
          username:profile.username

        })
        // console.log(response)

        if(response.data.success){
          toast.success("username updated")
          setTimeout(()=>{
           router.push("/dashboard")
          },1200)
        }
      } catch (error) {
        errorHandler(error)
         
        
      }
    }
  return (
    <div className=" backdrop-blur-sm backdrop-opacity-70 bg-loginImage  text-base w-screen h-screen flex items-center justify-center">
    
    <Tabs defaultValue="account" className="max-w-xl w-full mx-2 md:mx-0  ">
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger className="" value="account">account</TabsTrigger>
        <TabsTrigger value="password">password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className=" ">
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
              <Input required onChange={onChange} id="username" defaultValue={profile.username} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="roles">Roles</Label>
              <Input required  disabled id="roles" defaultValue={profile.roles}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input required disabled id="email" defaultValue={profile.email} />
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1">Save Changes</Button>
            <Button onClick={(e)=>{
              e.preventDefault();
              router.push("/dashboard")
            }} className="bg-red-500 border-red-200 hover:bg-red-600 ">Cancel</Button>
            
          </CardFooter>
          </form>
        </Card>
         
      </TabsContent>
     
      <TabsContent value="password">
        <Card className="">
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
              <Input  required onChange={onChangePassword} id="current" type="password" value={password.current} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new" >New password</Label>
              <Input required  onChange={onChangePassword} id="new" type="password"  value={password.new}/>
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmNew" >Confirm Password</Label>
              <Input required  onChange={onChangePassword} id="confirmNew" type="password" value={password.confirmNew} />
            </div>
          </CardContent>
        <CardFooter className="flex gap-2">
            <Button type="submit" className="flex-1">Save password</Button>
            
            <Button onClick={(e)=>{
              e.preventDefault();
              router.push("/dashboard")
            }} className="bg-red-500 border-red-200 hover:bg-red-600 ">Cancel</Button>
            
          </CardFooter>
          
           </form>
        </Card>
      </TabsContent>
      
    </Tabs> 
    </div>
  )

}

