// "use client"
// import HlsPlayer from '@/components/hslplayer';
// import PaginationClient from '@/components/Pagination';
// import { camera } from '@/typescript.definations';
// import { axiosAuth } from '../lib/axios';
// import { useSearchParams } from 'next/navigation';
// import { errorHandler } from '@/hooks/useTableHook';
// import { useEffect, useState } from 'react';
// type dataDetail={
//   message:camera[],
//   success:boolean,
//   totalCount:number,
//   countPerPage:number,
// }
// function User() {
// const searchParams=useSearchParams()
// const page=searchParams.get("page") ?? '1'
// const limit=searchParams.get("limit") ?? '8'

// const gridLimit=Number(limit)/2
// const start=(Number(page)-1)*(Number(limit))
// const end=start+Number(limit)

// // console.log(page,limit)
// const [data,setData]=useState<dataDetail>({
//   success:false,
//   message:[],
//   totalCount:0,
//   countPerPage:0
// })
//  async function getFilteredData(){
//   try {
//     const response =await axiosAuth.get(`/camera/filtered?page=${page}&limit=${limit}`)
//     if(response.data){
//   setData(response.data)
//     }
    
//   } catch (error) {
//     errorHandler(error)
    
//   }
//  }
 
// useEffect(()=>{
//   getFilteredData()
// },[page,limit])

 
//   const hasNext=(end < data.totalCount)
//  const hasPrevious=(start>0)

  

  


// return (

// <main className=''>
//   <div className='pt-3 pb-5'>
//     <div className="">
//       <PaginationClient data={data} hasNext={hasNext} hasPrevious={hasPrevious}/>
//     </div>
   
//   </div>
//   <div className={`grid ${gridLimit===3?"grid-cols-3":"lg:grid-cols-4"} gap-x-1 gap-y-1  mx-1  `}>
      
//    {
//     data && data.message.map((item:camera)=>(
//       <div key={item._id} id={item._id}>
//          {/* <HlsPlayer url={item.url}/> */}
//          <HlsPlayer item={item}/>
//       </div>
//     ))
//    }
    
//   </div>
     
//   </main>


// )
// }

// export default User;


// code given by chatgpt

"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { axiosAuth } from "@/app/lib/axios";
import { errorHandler } from "@/hooks/useTableHook";
import PaginationClient from "@/components/Pagination";
import HlsPlayer from "@/components/hslplayer";
import type { camera } from "@/typescript.definations";

// -------------------------------
// 🔹 Types
// -------------------------------
interface DataDetail {
  message: camera[];
  success: boolean;
  totalCount: number;
  countPerPage: number;
}

export default function User() {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 6);

  // Pre-calc pagination info
  const start = (page - 1) * limit;
  const end = start + limit;

  const [data, setData] = useState<DataDetail>({
    success: false,
    message: [],
    totalCount: 0,
    countPerPage: 0,
  });

  // -------------------------------
  // 🔹 Fetch Data (memoized + async-safe)
  // -------------------------------
  const getFilteredData = useCallback(async () => {
    try {
      const response = await axiosAuth.get(`/camera/filtered`, {
        params: { page, limit },
      });
      if (response.data) setData(response.data);
    } catch (error) {
      errorHandler(error);
    }
  }, [page, limit]);

  useEffect(() => {
    getFilteredData();
  }, [getFilteredData]);

  // -------------------------------
  // 🔹 Derived Pagination State
  // -------------------------------
  const { hasNext, hasPrevious, gridCols } = useMemo(() => {
    return {
      hasNext: end < data.totalCount,
      hasPrevious: start > 0,
      gridCols: limit / 2 === 3 ? "grid-cols-3" : "lg:grid-cols-4",
    };
  }, [end, start, limit, data.totalCount]);

  // -------------------------------
  // 🔹 Render
  // -------------------------------
  return (
    <main className="min-h-screen bg-loginImage">
      {/* Pagination Header */}
      <section className="pt-3 pb-5">
        <PaginationClient
          data={data}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
        />
      </section>

      {/* Video Grid */}
      <section
        className={`grid ${gridCols} gap-x-2 gap-y-3 mx-2 transition-all duration-150 `}
      >
        {data?.message.map((item) => (
          <div
            key={item._id}
            id={item._id}
            className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
          >
            <HlsPlayer item={item} />
          </div>
        ))}
      </section>
    </main>
  );
}

