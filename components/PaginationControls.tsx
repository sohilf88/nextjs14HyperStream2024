'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@mui/material'
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import ArrowLeftTwoToneIcon from '@mui/icons-material/ArrowLeftTwoTone';
interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  totalCount:number
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    totalCount
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per_page = 6
  const end=Math.ceil(Number(totalCount)/Number(per_page))
  return (

    <div className="max-w-lg flex justify-center mx-auto mt-1">
  <div className="flex flex-row mx-auto">
    <button
    disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/user/selected?page=${Number(page) - 1}`)
        }}
     type="button" className="bg-zinc-700 shadow-2xl text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3">
      <div className="flex flex-row align-middle">
        <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        <p className="ml-2">Prev</p>
      </div>
      
    </button>
    <div className='flex bg-zinc-700 shadow-2xl justify-center items-center text-white px-4 hover:bg-red-700'>{page} / {end}</div>
    <button
    disabled={!hasNextPage}
        onClick={() => {
          router.push(`/user/selected?page=${Number(page) + 1}`)
        }}
    type="button" className={`bg-zinc-700 shadow-2xl text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3`}>
      <div className="flex flex-row align-middle">
        <span className="mr-2">Next</span>
        <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </div>
    </button>
  </div>
</div>
    // <main classNameName="flex justify-center items-center ">
    // <div classNameName='flex gap-4  justify-center items-center '>
    //   <Button size='large' color='error' variant='outlined'
    //    startIcon={<ArrowLeftTwoToneIcon/>}
    //     disabled={!hasPrevPage}
    //     onClick={() => {
    //       router.push(`/user/selected?page=${Number(page) - 1}`)
    //     }}>
    //     Previous
    //   </Button>

    //   <div>
    //     {page} / {end}
    //   </div>

    //   <Button
    //   size='large' color='success' variant='outlined'
    //      endIcon={<ArrowRightTwoToneIcon/>}
    //     disabled={!hasNextPage}
    //     onClick={() => {
    //       router.push(`/user/selected?page=${Number(page) + 1}`)
    //     }}>
    //     Next
    //   </Button>
    // </div>
    // </main>
  )
}

export default PaginationControls