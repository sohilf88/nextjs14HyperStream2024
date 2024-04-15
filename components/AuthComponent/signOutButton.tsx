 "use server"
import { signOut } from "@/auth"
 
export async function SignOutButton() {
  return (
   
      <button type="submit">Logout</button>
   
  )
}