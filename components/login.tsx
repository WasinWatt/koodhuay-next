'use client'

import { useEffect } from 'react'
import '@passageidentity/passage-elements/passage-auth'

export default function PassageLogin() {
  useEffect(() => {
    require('@passageidentity/passage-elements/passage-auth')
  }, [])

  return (
    <div className='border rounded-lg w-[360px] mx-auto'>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </div>
  )
}
