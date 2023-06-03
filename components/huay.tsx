'use client'
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Tooltip,
} from '@chakra-ui/react'

import { Huay } from '@/types/huay'
import { CopyIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Image from 'next/image'

export default function Huay({
  huay: { won, number, description, id },
}: {
  huay: Huay
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  return (
    <Card width={360} height={170} className='mx-auto'>
      <CardHeader
        className='flex justify-between'
        padding='14px'
        paddingRight='0px'
      >
        <div className='flex items-center'>
          <Badge colorScheme={won ? 'green' : 'red'} px='4' rounded='md'>
            <p className='text-xl'>{won ? 'กินหวย' : 'โดนแดก'}</p>
          </Badge>
        </div>
        <h3 className='text-3xl font-semibold text-right tracking-[0.5em]'>
          {number}
        </h3>
      </CardHeader>
      <CardBody
        padding='14px'
        paddingTop='0px'
        className='flex justify-between'
      >
        <Image src='' alt='รูปหมา' width={150} height={70} />
        <div className='flex flex-col justify-between'>
          <p className='text-right'>{description}</p>
          <Tooltip
            isOpen={isTooltipOpen}
            label='ก๊อปลิงก์เรียบร้อย!'
            onClose={() => setIsTooltipOpen(false)}
          >
            <Button
              rightIcon={<CopyIcon />}
              colorScheme='teal'
              variant='outline'
              size={'xs'}
              className='mt-2 mx-auto z-40'
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(
                  `${window.location.origin}/huays/${id}`
                )
                setIsTooltipOpen(true)
              }}
            >
              แชร์
            </Button>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  )
}
