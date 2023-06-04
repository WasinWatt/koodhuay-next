'use client'
import HuayComponent from '@/components/huay'
import { Huay } from '@/types/huay'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'

export default function HuayClientPage({ huay }: { huay: Huay }) {
  return (
    <div className='flex flex-col justify-center'>
      <HuayComponent huay={huay} />
      <Link href='/' className='mt-5 mx-auto'>
        <Button
          leftIcon={<ArrowBackIcon />}
          colorScheme='teal'
          variant='outline'
        >
          กลับไปส่องหวยต่อ
        </Button>
      </Link>
    </div>
  )
}
