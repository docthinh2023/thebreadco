'use server'
 
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '../lib/session'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  return await decrypt(cookie)

})

