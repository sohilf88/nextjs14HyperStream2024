"use client"
import HlsPlayer from '@/components/hslplayer';

import PaginationClient from '@/components/Pagination';
import { camera } from '@/typescript.definations';
import { axiosAuth } from '../lib/axios';


async function user({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {

 
  const page = searchParams['page'] ?? '1'
  const limit = searchParams['limit'] ?? '8'
 
 const gridLimit=Number(limit)/2
  const start=(Number(page)-1)*(Number(limit))
  const end=start+Number(limit)
 
  const response=await axiosAuth.get(`/camera/filtered?page=${page}&limit=${limit}`,{withCredentials:true})
  // console.log(response)
 const hasNext=(end < response.data.totalCount)
 const hasPrevious=(start>0)

  


return (

<main className=''>
  <div className='pt-7 pb-6'>
    <div className="">
      <PaginationClient data={response.data} hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
   
  </div>
  <div className={`grid ${gridLimit===3?"grid-cols-3":"lg:grid-cols-4"} gap-x-1 gap-y-3  mx-1  `}>
      
   {
    response.data && response.data.message.map((item:camera)=>(
      <div key={item._id}>
         <HlsPlayer url={item.url}/>
      </div>
    ))
   }
  
  </div>
     
  </main>


)
}

export default user;
