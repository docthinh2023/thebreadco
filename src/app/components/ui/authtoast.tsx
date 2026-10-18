'use client'

import { useEffect} from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

export default function AuthToastNotifier() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const errorType = searchParams.get('error')

    if (errorType === 'unauthenticated'){
      toast.error('Sign-in to proceed.')
      const authParams = new URLSearchParams(searchParams.toString())
      authParams.delete('error')
      
      const newAuthUrl = authParams.toString() ? `${pathname}?${authParams.toString()}` : pathname
      router.replace(newAuthUrl)
    }

     if(errorType === 'unauthorized') 
     {toast.error('Only admin role can access that page.')
      const authParams = new URLSearchParams(searchParams.toString())
      authParams.delete('error')
      
      const newUrl = authParams.toString() ? `${pathname}?${authParams.toString()}` : pathname
      router.replace(newUrl)}
    
  }, [searchParams, pathname, router])

  return null
}
