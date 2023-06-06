import './globals.css'
import { Prompt } from 'next/font/google'
import { Providers } from './providers'

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
      <body className={prompt.className}>
        <Providers>
          <div className='max-w-3xl mx-auto w-full px-2'>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src='/home/doge-banner.gif' alt='banner' className='w-full' />
            <div className='py-10'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
