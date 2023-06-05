'use client'

import analytics from '@/utils/analytics'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import { logEvent } from 'firebase/analytics'
import { useEffect } from 'react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    logEvent(analytics, 'app_landed')
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
