import axios from '@/utils/axios'
import HuayClientPage from './client-page'

export default async function HuayPage({ params }: { params: { id: string } }) {
  const {
    data: { huay },
  } = await axios.get(`/api/v1/huays/${params.id}`)

  return <HuayClientPage huay={huay} />
}
