'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

import { extendTheme } from '@chakra-ui/react'
import { Analytics, getAnalytics } from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'
import { createContext, useContext, useEffect, useState } from 'react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const firebaseConfig = {
  apiKey: 'AIzaSyBoY9oOWgMDmXr0xy-K-XD0NzG615tL1Bk',
  authDomain: 'koodhuay-prod.firebaseapp.com',
  projectId: 'koodhuay-prod',
  storageBucket: 'koodhuay-prod.appspot.com',
  messagingSenderId: '912964390417',
  appId: '1:912964390417:web:01e13606ed11fec336ebb0',
  measurementId: 'G-0KH76Y345S',
}

export const theme = extendTheme({ colors })

type GAContext = {
  analytics: ReturnType<typeof getAnalytics> | null
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Context = createContext<GAContext>()

export function Providers({ children }: { children: React.ReactNode }) {
  const [analytics, setAnalytics] = useState<Analytics | null>(() => null)

  useEffect(() => {
    let app = getApps()[0]

    if (!app) {
      app = initializeApp(firebaseConfig)
    }

    setAnalytics(getAnalytics(app))
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Context.Provider value={{ analytics }}>{children}</Context.Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export const useGA = () => useContext(Context)
