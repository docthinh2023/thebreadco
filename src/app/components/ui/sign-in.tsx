'use client'
import {login} from '../../actions/login'
import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import MaxWidthWrapper from '../maxwidthwrapper';
import {toast} from 'react-toastify'
import { redirect } from 'next/navigation';
 
export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)

    useEffect(() => {
    if(!state) return;
      if (state.status === 'success' && state.message) {
        toast.success(state.message)
        redirect('/');
      } else if (state.status === 'error' && state.message) {
        toast.error(state.message);
      }
  }, [state]);
 
  return (
  <MaxWidthWrapper>
  <div className="min-h-screen  bg-amber-100 py-12 px-4 sm:px-6 lg:px-8">
   <div className='w-full h-full flex items-center justify-center'>
    <form action={action}>
      <section className='bg-amber-200 mt-20 p-8 rounded-lg shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700'>
      <div className='flex flex-col space-y-4'>
      <h2 className="text-xl md:text-2xl text-primary mb-4 self-center">Sign In</h2>
      <div className='flex flex-col'>
        <label htmlFor="email" className="block text-xs md:text-xl font-medium text-muted mb-1">Email</label>
        <input id="userEmail" name="userEmail" placeholder="johndoe@gmail.com" className="text-xs md:text-xl w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm sm:text-sm"/>
      </div>
      {state?.error?.userEmail && <p className='text-fg-primary'>{state.error.userEmail}</p>}
 
      <div className='flex flex-col'>
        <label htmlFor="password" className="block text-xs md:text-xl font-medium text-muted mb-1">Password</label>
        <input id="userPassword" name="userPassword" placeholder='******' type="password" className="text-xs md:text-xl w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm sm:text-sm"/>
      </div>
      {state?.error?.userPassword && <p className='text-fg-primary'>{state.error.userPassword}</p>}
      <Link href='/sign-up' className='underline text-muted text-xs md:text-xl mt-4 self-center'>Create an account</Link>
      <button className='cursor-pointer text-xs md:text-xl rounded-2xl bg-primary py-2 text-bg-secondary hover:bg-fg-primary ease-in-out duration-700' disabled={pending} type="submit">
        {pending? 'Signing In...' : 'Sign In'}
      </button>
      </div>
      </section>
    </form>
   </div>
  </div>
  </MaxWidthWrapper>
  )
}