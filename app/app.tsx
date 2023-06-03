'use client'

import HuayComponent from '@/components/huay'
import PassageLogin from '@/components/login'
import ShareHuayForm from '@/components/share-huay-form'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { Button, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { Huay } from '@/types/huay'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function App({
  userId,
  huays,
}: {
  userId: string | null
  huays: Huay[]
}) {
  const router = useRouter()
  const [showShareHuayForm, setShowShareHuayForm] = useState(false)

  return (
    <>
      <div>
        <h1 className='font-semibold text-3xl text-center mb-5'>
          พื้นที่แบ่งปันแรงบันดาลใจขูดหวย
        </h1>
      </div>
      {userId ? (
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <Button
              leftIcon={<PlusSquareIcon />}
              variant={'solid'}
              className='mb-5 bg-[#2bd498] hover:bg-[#2bd498] hover:scale-105'
              onClick={() => setShowShareHuayForm(!showShareHuayForm)}
            >
              แชร์ประสบการณ์ขูดหวย
            </Button>
            {showShareHuayForm && (
              <ShareHuayForm
                close={() => {
                  setShowShareHuayForm(false)
                  router.refresh()
                }}
              />
            )}
          </div>
          <SimpleGrid
            spacing={4}
            templateColumns='repeat(auto-fill, minmax(360px, 1fr))'
            alignItems={'center'}
          >
            {huays.map((huay, index) => (
              <Link
                href={`/huays/${huay.id}`}
                key={index}
                className='flex justify-center'
              >
                <HuayComponent huay={huay} />
              </Link>
            ))}
          </SimpleGrid>
        </div>
      ) : (
        <div>
          <p className='text-center mb-6'>
            กรุณาเข้าสู่ระบบเพื่อดูและแชร์เลขหวย
          </p>
          <PassageLogin />
        </div>
      )}
    </>
  )
}
