import App from './app'
import axios from '@/utils/axios'

export default async function Home() {
  const {
    data: { huays },
  } = await axios.get('/api/v1/huays?sortBy=likes')

  return <App huays={huays} />
}
