'use client'

import HuayComponent from '@/components/huay'
import PassageLogin from '@/components/login'
import ShareHuayForm from '@/components/share-huay-form'
import { ArrowForwardIcon } from '@chakra-ui/icons'
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
        <h2 className='font-semibold text-3xl text-center mb-5'>แชร์หวย</h2>
      </div>
      {userId ? (
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme='teal'
              variant='outline'
              className='mb-5'
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
