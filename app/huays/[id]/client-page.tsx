'use client'
import HuayComponent from '@/components/huay'
import { Huay } from '@/types/huay'
import { ArrowBackIcon, CopyIcon } from '@chakra-ui/icons'
import { Button, Tooltip } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'

export default function HuayClientPage({ huay }: { huay: Huay }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  return (
    <div className='flex flex-col justify-center'>
      <HuayComponent huay={huay} />
      <Tooltip
        isOpen={isTooltipOpen}
        label='Copied!'
        onClose={() => setIsTooltipOpen(false)}
      >
        <Button
          rightIcon={<CopyIcon />}
          colorScheme='teal'
          variant='outline'
          className='mt-5 mx-auto'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setIsTooltipOpen(true)
          }}
        >
          ก๊อปลิงก์เทคนิคนี้ไปแชร์ใน social
        </Button>
      </Tooltip>
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
