import axios from 'axios';
import HlsPlayer from '@/components/hslplayer';
import TablePaginations from '@/components/Pagination';
import PaginationClient from '@/components/Pagination';
import { camera } from '@/typescript.definations';


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
 
  const response=await axios.get(`http://127.0.0.1:5000/api/v1/camera/filtered?page=${page}&limit=${limit}`)
  
 const hasNext=(end < response.data.totalCount)
 const hasPrevious=(start>0)
console.log(gridLimit)
  


return (
<main className=''>
  <div className='pt-7 pb-6'>
    <div className="  ">
      <PaginationClient hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
   
  </div>
  <div className={`grid ${gridLimit===3?"grid-cols-3":"lg:grid-cols-4"} gap-x-1 gap-y-3  mx-1  `}>
      
   {
    response.data.result.map((item:camera)=>(
      <div key={item._id}>
         <HlsPlayer url={item.url}/>
      </div>
    ))
   }
   
    
   
   
    
   
  </div>
  {/* <div className=' absolute lg:bottom-16 xl:bottom-20  w-full'>
    <div className="text-center">
      <PaginationClient hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
    
   </div> */}
   
  </main>


)
}

export default user;
