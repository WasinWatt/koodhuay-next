'use client'

import { useEffect } from 'react'

export default function PassageLogin() {
  useEffect(() => {
    require('@passageidentity/passage-elements/passage-auth')
  }, [])

  return (
    <div className='border border-black rounded-lg w-[360px] mx-auto'>
      <p className='text-sm mt-2 underline'>หากยังไม่เคย register กับระบบ</p>
      <p className='text-sm underline'>
        กดปุ่ม Register here ด้านล่างกล่องก่อนนะคะ
      </p>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}
      ></passage-auth>
    </div>
  )
}
