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
    <main className="flex justify-center items-center ">
    <div className='flex gap-4  justify-center items-center '>
      <Button size='large' color='error' variant='outlined'
       startIcon={<ArrowLeftTwoToneIcon/>}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/user/selected?page=${Number(page) - 1}`)
        }}>
        Previous
      </Button>

      <div>
        {page} / {end}
      </div>

      <Button
      size='large' color='success' variant='outlined'
         endIcon={<ArrowRightTwoToneIcon/>}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/user/selected?page=${Number(page) + 1}`)
        }}>
        Next
      </Button>
    </div>
    </main>
  )
}

export default PaginationControls