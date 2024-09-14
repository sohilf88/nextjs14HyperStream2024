"use server"
import { redirect } from 'next/navigation'
const userDashboard = async() => {
  

redirect("/dashboard")

return;
};

export default userDashboard;
