'use client'
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Button,
  Tooltip,
  Icon,
} from '@chakra-ui/react'

import { Huay } from '@/types/huay'
import { ArrowUpIcon, CopyIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import Image from 'next/image'
import axios from '@/utils/axios'
import { logEvent } from 'firebase/analytics'
import { useGA } from '@/app/providers'

const CircleIcon = (props: object) => (
  <Icon viewBox='0 0 200 200' {...props} className='w-4 h-4 opacity-30'>
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  </Icon>
)

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
        paddingRight='12px'
        paddingTop='10px'
        paddingBottom='8px'
      >
        <div className='flex items-center'>
          <Badge colorScheme={won ? 'green' : 'red'} px='4' rounded='md'>
            <p className='text-xl'>{won ? 'กินหวย' : 'โดนแดก'}</p>
          </Badge>
        </div>
        <div className='text-2xl font-semibold flex justify-end gap-x-2 items-center'>
          {number
            .split('')
            .map((n, index) =>
              n === 'X' ? <CircleIcon key={index} /> : <h3 key={index}>{n}</h3>
            )}
        </div>
      </CardHeader>
      <CardBody
        padding='14px'
        paddingTop='0px'
        className='flex justify-between gap-x-1'
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
