'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

export default function NotificationHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const errorType = searchParams.get('error')
    if (!errorType) return 


    if (errorType === 'unauthorized') {
      toast.error('You are not authorized!')
    } else if (errorType === 'unauthenticated') {
      toast.warning('Log in to proceed!')
    } else {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete('error')
    
    const newQuery = params.toString() ? `?${params.toString()}` : ''
    router.replace(`${pathname}${newQuery}`)

  }, [searchParams, pathname, router])

  return null
}
