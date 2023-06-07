import './globals.css'
import { Prompt } from 'next/font/google'
import { Providers } from './providers'
import Link from 'next/link'
import Script from 'next/script'

const prompt = Prompt({ subsets: ['thai'], weight: ['400', '600', '700'] })

export const metadata = {
  title: 'ขูดหวย | แบ่งปันแรงบันดาลใจขูดหวย',
  description:
    'แบ่งปันประสบการณ์ซื้อหวย ลอตเตอรี่ งวดนี้งวดไหน มีเลขเด็ดอะไร โดนหวยแดกหรือกินหวยมาแชร์แรงบันดาลใจกัน',
  openGraph: {
    title: 'ขูดหวย | แบ่งปันแรงบันดาลใจขูดหวย',
    description:
      'แบ่งปันประสบการณ์ซื้อหวย ลอตเตอรี่ งวดนี้งวดไหน มีเลขเด็ดอะไร โดนหวยแดกหรือกินหวยมาแชร์แรงบันดาลใจกัน',
    url: 'https://koodhuay.space',
    images: [
      {
        url: 'https://koodhuay.space/og.png',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8900015899066295'
        crossOrigin='anonymous'
      />
      <body
        className={`${prompt.className} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
      >
        <Providers>
          <div className='max-w-3xl mx-auto w-full min-h-screen relative bg-orange-300'>
            <div className='flex flex-col items-center justify-center bg-black h-12 text-white'>
              <p className='text-xs'>
                สนใจร่วมกันสร้างเว็ปสนุก ๆ เพื่อสร้าง Brand Awareness
              </p>
              <p className='text-xs'>
                ติดต่อร่วมสร้างของกับพวกเราได้ที่{' '}
                <span className='font-semibold underline'>
                  betabuilder.co@gmail.com
                </span>
              </p>
            </div>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src='/home/doge-banner.gif' alt='banner' className='w-full' />
            <div className='flex items-center justify-center bg-primary h-8'>
              <p className='text-sm'>
                สนับสนุนโดย
                <Link
                  href='https://drinksonme.live'
                  className='ml-2 underline font-semibold'
                >
                  DrinksOnMe บาร์ออนไลน์
                </Link>
              </p>
            </div>
            <div className='py-10 px-2'>{children}</div>
            <div className='flex items-center justify-center bg-primary h-8 absolute bottom-0 w-full'>
              <p className='text-sm'>
                สนับสนุนโดย
                <Link
                  href='https://drinksonme.live'
                  className='ml-2 underline font-semibold'
                >
                  DrinksOnMe บาร์ออนไลน์
                </Link>
              </p>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
