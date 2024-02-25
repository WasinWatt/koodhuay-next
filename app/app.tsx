'use client'

import ShareHuayForm from '@/components/share-huay-form'
import { ArrowDownIcon, PlusSquareIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Button,
  Spinner,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Huay } from '@/types/huay'
import axios from '@/utils/axios'
import HuayGroup from '@/components/huay-group'

export default function App({ huays }: { huays: Huay[] }) {
  const [currentTab, setCurrentTab] = useState('hot')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [showShareHuayForm, setShowShareHuayForm] = useState(false)
  const [currentHuays, setCurrentHuays] = useState<Huay[]>(() => huays)

  const getHotPosts = async () => {
    try {
      setCurrentTab('hot')
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
      setCurrentTab('new')
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

  const getMorePosts = async () => {
    try {
      setIsLoadingMore(true)
      const sortBy = currentTab === 'hot' ? 'likes' : 'createdAt'
      const {
        data: { huays },
      } = await axios.get(
        `/api/v1/huays?sortBy=${sortBy}&lastId=${
          currentHuays[currentHuays.length - 1].id
        }`
      )
      setCurrentHuays((prev) => [...prev, ...huays])
    } catch (error) {
      console.log(error)
      alert('พบเจอปัญหาระหว่างขุดหวยค่า กรุณาลองใหม่นะคะ')
    }
    setIsLoadingMore(false)
  }

  useEffect(() => {
    axios
      .get('http://localhost:1317/cosmos/auth/v1beta1/accounts')
      .then((data) => console.log(data))
  }, [])

  return (
    <>
      <div className='text-center mb-5'>
        <h1 className='font-semibold text-3xl mb-1'>
          พื้นที่แบ่งปันแรงบันดาลใจขูดหวย
        </h1>
        <p className='text-sm text-gray-600'>
          เว็ปไซต์นี้มีไว้สำหรับการแชร์แรงบันดาลใจเพื่อความบันเทิงเท่านั้น
          ห้ามโปรโมทสินค้าการพนันหรือสิ่งผิดกฎหมายใด ๆ
        </p>
      </div>
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
              close={() => {
                setShowShareHuayForm(false)
                location.reload()
              }}
            />
          )}
        </div>
      </div>
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
            {isLoadingMore ? (
              <div className='flex justify-center mt-3'>
                <Spinner size={'lg'} />
              </div>
            ) : (
              <div
                className='flex justify-center mt-3 cursor-pointer underline'
                onClick={() => getMorePosts()}
              >
                <p className='text-lg'>
                  <ArrowDownIcon />
                  ดูหวยเพิ่ม
                </p>
              </div>
            )}
          </TabPanel>
          <TabPanel paddingX={0}>
            <HuayGroup huays={currentHuays} isLoading={isLoading} />
            {isLoadingMore ? (
              <div className='flex justify-center mt-3'>
                <Spinner size={'lg'} />
              </div>
            ) : (
              <div
                className='flex justify-center mt-3 cursor-pointer underline'
                onClick={() => getMorePosts()}
              >
                <p className='text-lg'>
                  <ArrowDownIcon />
                  ดูหวยเพิ่ม
                </p>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className='fixed bottom-5 right-5 z-50'>
        <Button
          leftIcon={<RepeatIcon />}
          variant={'solid'}
          className='bg-primary hover:bg-primary hover:scale-105 mb-2'
          onClick={() => (currentTab === 'hot' ? getHotPosts() : getNewPosts())}
        >
          โหลดข้อมูลล่าสุด
        </Button>
      </div>
    </>
  )
}
