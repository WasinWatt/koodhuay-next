'use client'
import HuayComponent from '@/components/huay'
import { Huay } from '@/types/huay'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function HuayClientPage({ huay }: { huay: Huay }) {
  return (
    <div className='flex flex-col justify-center'>
      <div className='md:scale-125'>
        <HuayComponent huay={huay} />
      </div>
      <Link href='/' className='mt-8 mx-auto'>
        <Button
          leftIcon={<ArrowBackIcon />}
          className='bg-primary hover:bg-primary hover:scale-105 border-none'
          variant='outline'
        >
          กลับไปส่องหวยต่อ
        </Button>
      </Link>
    </div>
  )
}
