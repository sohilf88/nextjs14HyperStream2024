"use client"


import PaginationControls from "@/components/PaginationControls"
import HlsPlayer from "@/components/hslplayer"
import { useAppSelector } from "@/reduxtoolkit/store/Hooks"

function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = searchParams['page'] ?? '1'
   const per_page = searchParams['per_page'] ?? '6'
   const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
   const end = start + Number(per_page) // 5, 10, 15 ...

  
    const {selectedCamera}=useAppSelector((store)=>store.root.cameras)
    const entries = selectedCamera.slice(start, end)
    
    const hasNext=(end < selectedCamera.length)
    const hasPrevious=(start>0)
  return (
    <div className="grid grid-cols-3 gap-x-1 gap-y-3">
        <div className='pt-5 pb-5 col-span-full text-center font-semibold text-white text-xl tracking-wider shadow-md px-2 bg-zinc-800 shadow-xl'>
          <PaginationControls
           hasNextPage={hasNext}
           hasPrevPage={hasPrevious}
           totalCount={selectedCamera.length}
          />
        </div>
      
   {
    entries.map((item)=>(
      <div className="shadow-lg" key={item._id}>
         <HlsPlayer url={item.url}/>
      </div>
    ))
   }
   </div>
  )
}

export default page