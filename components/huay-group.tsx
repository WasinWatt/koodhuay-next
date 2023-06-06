import { SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'

import HuaySkeleton from './huay-skeleton'
import { Huay } from '@/types/huay'
import HuayComponent from './huay'

export default function HuayGroup({
  huays,
  isLoading,
}: {
  huays: Huay[]
  isLoading: boolean
}) {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns='repeat(auto-fill, minmax(360px, 1fr))'
      justifyItems={'center'}
    >
      {isLoading &&
        [1, 2, 3, 4].map((_, index) => (
          <div className='flex justify-center' key={index}>
            <HuaySkeleton />
          </div>
        ))}
      {!isLoading &&
        huays.map((huay, index) => (
          <Link
            href={`/huays/${huay.id}`}
            key={index}
            className='flex justify-center w-[360px]'
          >
            <HuayComponent huay={huay} />
          </Link>
        ))}
    </SimpleGrid>
  )
}
