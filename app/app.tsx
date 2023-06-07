'use client'

import PassageLogin from '@/components/login'
import ShareHuayForm from '@/components/share-huay-form'
import { PlusSquareIcon } from '@chakra-ui/icons'
import {
  Button,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Huay } from '@/types/huay'
import axios from '@/utils/axios'
import HuayGroup from '@/components/huay-group'

export default function App({
  userId,
  huays,
}: {
  userId: string | null
  huays: Huay[]
}) {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showShareHuayForm, setShowShareHuayForm] = useState(false)
  const [currentHuays, setCurrentHuays] = useState<Huay[]>(() => huays)

  const getHotPosts = async () => {
    try {
      setIsLoading(true)
      const {
        data: { huays },
      } = await axios.get('/api/v1/huays?sortBy=likes')
      setCurrentHuays(huays)
    } catch (error) {
      console.log(error)
      alert('พบเจอปัญหาระหว่างขุดหวยค่า กรุณาลองใหม่นะคะ')
    }
    setTimeout(() => setIsLoading(false), 1000)
  }

  const getNewPosts = async () => {
    try {
      setIsLoading(true)
      const {
        data: { huays },
      } = await axios.get('/api/v1/huays?sortBy=createdAt')
      setCurrentHuays(huays)
    } catch (error) {
      console.log(error)
      alert('พบเจอปัญหาระหว่างขุดหวยค่า กรุณาลองใหม่นะคะ')
    }
    setTimeout(() => setIsLoading(false), 1000)
  }

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
              className='bg-primary hover:bg-primary hover:scale-105 mb-2'
              onClick={() => setShowShareHuayForm(!showShareHuayForm)}
            >
              แชร์ประสบการณ์ขูดหวย
            </Button>
            {showShareHuayForm && (
              <ShareHuayForm
                userId={userId}
                close={() => {
                  setShowShareHuayForm(false)
                  location.reload()
                }}
              />
            )}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <p className='text-center mb-6'>กรุณาเข้าสู่ระบบเพื่อแชร์เลขหวย</p>
          {!showLogin && (
            <Button
              variant={'solid'}
              className='bg-[#2bd498] hover:bg-[#2bd498] hover:scale-105'
              onClick={() => setShowLogin(true)}
            >
              เข้าสู่ระบบ
            </Button>
          )}
          {showLogin && <PassageLogin />}
        </div>
      )}
      <Tabs position='relative' isFitted marginTop='16px'>
        <TabList>
          <Tab
            onClick={() => getHotPosts()}
            color='purple.500'
            className='font-bold'
          >
            กำลังฮิต 🔥
          </Tab>
          <Tab
            onClick={() => getNewPosts()}
            color='purple.500'
            className='font-bold'
          >
            มาใหม่ ✨
          </Tab>
        </TabList>
        <TabIndicator
          mt='-1.5px'
          height='2px'
          bg='pink.400'
          borderRadius='1px'
        />
        <TabPanels>
          <TabPanel paddingX={0}>
            <HuayGroup huays={currentHuays} isLoading={isLoading} />
          </TabPanel>
          <TabPanel paddingX={0}>
            <HuayGroup huays={currentHuays} isLoading={isLoading} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
