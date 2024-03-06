"use client"

import HlsPlayer from "@/components/hslplayer"
import { useAppSelector } from "@/reduxtoolkit/store/Hooks"

function page() {
    const {selectedCamera}=useAppSelector((store)=>store.root.cameras)
  return (
    <div className="grid grid-cols-3 gap-x-1 gap-y-3 mx-1">
        <div className='pt-5 pb-5 col-span-full text-center font-semibold text-white text-xl tracking-wider shadow-md px-2'>selected cameras</div>
      
   {
    selectedCamera.map((item)=>(
      <div key={item._id}>
         <HlsPlayer url={item.url}/>
      </div>
    ))
   }
   </div>
  )
}

export default page