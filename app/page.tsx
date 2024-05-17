
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Header from "./../components/Header";


import SimpleTable from "@/components/Table/simpleTable";
import Header2 from "@/components/Header2";




const userDashboard = async() => {
  
return (
    <div>
      {/* <Header></Header> */}
      <Header2></Header2>
      <div className="uppercase md:mx-4 px-1 sm:px-4 md:px-8 md:mt-2 xl:mt-7  ">
        {/* The AG Grid component */}
       
        <SimpleTable />
       
      </div>
     
    
    </div>
  );
};

export default userDashboard;
