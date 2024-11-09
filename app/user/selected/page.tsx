"use client"

import PaginationControls from "@/components/PaginationControls"
import HlsPlayer from "@/components/hslplayer"
import { useAppSelector } from "@/reduxtoolkit/store/Hooks"
import { camera } from "@/typescript.definations"
import { useSearchParams } from "next/navigation"
import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import { Button } from "@mui/material"


function page() {
 
  // able to capture html element only, unable to capture video in  below code, need improvement

  function takeSnapshot(){
    const screenshot=document.getElementById("capture-selected")
  if(screenshot){
    html2canvas(screenshot).then((canvas)=>{
      let image=canvas.toDataURL("image/jpg")
      const capturedImage=document.createElement("a")
      capturedImage.href=image
      capturedImage.download=`snapshot-${Date.now()}`
      capturedImage.click()
    }).catch((error)=>toast.error(error))
  }

  }




   
  const searchParams=useSearchParams()
  const page=searchParams.get("page") ?? '1'
  const per_page=searchParams.get("per_page") ?? '6'
  
   const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
   const end = start + Number(per_page) // 5, 10, 15 ...

  
    const {selectedCamera}=useAppSelector((store)=>store.root.cameras)
    const entries = selectedCamera.slice(start, end)
    
    const hasNext=(end < selectedCamera.length)
    const hasPrevious=(start>0)
  return (
    <main id="capture-selected">
       <div className='h-16 flex items-center justify-center font-semibold text-white/60 text-xl tracking-wider px-2 shadow-xl'>
          <PaginationControls
           hasNextPage={hasNext}
           hasPrevPage={hasPrevious}
           totalCount={selectedCamera.length}
          />
          {/* need to develope more, unable to capture running video in snapshot. */}
          {/* <Button onClick={takeSnapshot}>snapshot</Button> */}
        </div>
        <div className="py-1 3xl:py-6"></div>
      <div className=" mx-1 grid grid-cols-3 gap-x-1 gap-y-1 3xl:gap-y-3 3xl:gap-x-3">
       
   
      
   {
    entries.map((item:camera)=>(
      <div className="shadow-xl" key={item._id} id={item._id}>
         <HlsPlayer item={item}/>
         
         
        
      </div>
    ))
   }
   </div>
   </main>
  )
}

export default page