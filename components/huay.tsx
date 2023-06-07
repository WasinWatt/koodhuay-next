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
import { ArrowUpIcon, CopyIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Image from 'next/image'
import axios from '@/utils/axios'
import { logEvent } from 'firebase/analytics'
import { useGA } from '@/app/providers'

export default function Huay({
  huay: { won, number, description, id, likes },
}: {
  huay: Huay
}) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const { analytics } = useGA()
  return (
    <Card
      width={360}
      height={190}
      className='mx-auto bg-orange-100'
      variant='outline'
      borderColor='black'
      borderWidth={2}
    >
      <CardHeader
        className='flex justify-between'
        paddingLeft='14px'
        paddingRight='0px'
        paddingTop='10px'
        paddingBottom='8px'
      >
        <div className='flex items-center'>
          <Badge colorScheme={won ? 'green' : 'red'} px='4' rounded='md'>
            <p className='text-xl'>{won ? 'กินหวย' : 'โดนแดก'}</p>
          </Badge>
        </div>
        <h3 className='text-2xl font-semibold text-right tracking-[0.5em]'>
          {number}
        </h3>
      </CardHeader>
      <CardBody
        padding='14px'
        paddingTop='0px'
        className='flex justify-between'
      >
        <Image
          src={won ? '/huay/doge-won.png' : '/huay/doge-lost.png'}
          alt='รูปหมา'
          width={150}
          height={70}
          className='rounded-sm'
        />
        <div className='flex flex-col justify-between items-end'>
          <p
            className={`text-right break-words ${
              description.length <= 100 ? 'text-sm' : 'text-xs'
            }`}
          >
            {description}
          </p>
          <div>
            <Button
              leftIcon={<ArrowUpIcon />}
              colorScheme='pink'
              variant='outline'
              size={'xs'}
              className='mt-2 z-40 mr-1'
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(true)
                axios.post(`/api/v1/huays/${id}/likes`)
              }}
              isDisabled={isLiked}
            >
              {isLiked ? likes + 1 : likes}
            </Button>
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
                className='mt-2 z-40'
                onClick={(e) => {
                  e.preventDefault()
                  navigator.clipboard.writeText(
                    `${window.location.origin}/huays/${id}`
                  )
                  analytics && logEvent(analytics, 'huay_link_copied')
                  setIsTooltipOpen(true)
                }}
              >
                แชร์
              </Button>
            </Tooltip>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
