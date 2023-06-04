import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function HuaySkeleton() {
  return (
    <Box
      width={360}
      height={190}
      padding='6'
      bg='white'
      border='1px'
      borderColor={'black'}
      rounded={'md'}
    >
      <div className='flex gap-x-1 justify-end'>
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
        <SkeletonCircle size='6' />
      </div>
      <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
    </Box>
  )
}
