
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Header from "./../components/Header";
import { auth, signOut } from "@/auth";

import SimpleTable from "@/components/Table/simpleTable";
import { redirect } from "next/navigation";



const userDashboard = async() => {
  const user=await auth()
  if(!user?.user?.accessToken){
    redirect("/auth/signin")
  }
 
 console.log(process.env.NEXT_PUBLIC_URL)
return (
    <div>
      <Header></Header>
      
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-2 xl:mt-7 3xl:mt-20 ">
        {/* The AG Grid component */}
       
        <SimpleTable />
       
      </div>
     
    
    </div>
  );
};

export default userDashboard;
