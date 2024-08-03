import axios from '@/utils/axios'
import HuayClientPage from './client-page'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const {
    data: { huay },
  } = await axios.get(`/api/v1/huays/${params.id}`)

  return {
    title: `เลขอวยอันทรงเกียรติ - ${huay.number}`,
    description: huay.description,
    openGraph: {
      title: `เลขอวยอันทรงเกียรติ - ${huay.number}`,
      description: huay.description,
      url: 'https://koodhuay-next.vercel.app',
      images: [
        {
          url: 'https://koodhuay-next.vercel.app/og.png',
        },
      ],
      type: 'website',
    },
  }
}

export default async function HuayPage({ params }: { params: { id: string } }) {
  const {
    data: { huay },
  } = await axios.get(`/api/v1/huays/${params.id}`)

  return <HuayClientPage huay={huay} />
}
