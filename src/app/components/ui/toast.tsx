'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

export default function NotificationHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const notifyType = searchParams.get('notify')

    if (notifyType === 'profile_updated') {
      toast.success('Your profile has been updated successfully!')

      const params = new URLSearchParams(searchParams.toString())
      params.delete('notify')
      
      const newQuery = params.toString() ? `?${params.toString()}` : ''
      router.replace(`${pathname}${newQuery}`)
    }
  }, [searchParams, pathname, router])

  return null
}
