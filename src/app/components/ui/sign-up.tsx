'use client'
import { signup } from '../../actions/sign-up'
import { useActionState, useEffect } from 'react'
import Link from 'next/link'
import MaxWidthWrapper from '../maxwidthwrapper';
import { toast } from 'react-toastify';
import { SignUpFormState } from '@/app/lib/definitions';
import {redirect} from 'next/navigation'
const initialSate: SignUpFormState = {
    status: 'loading'
}


export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, initialSate)
  
    useEffect(() => {
    if(!state) return;
      if (state.status === 'success' && state.message) {
        toast.success(state.message);
        redirect('/');
      } else if (state.status === 'error' && state.message) {
        toast.error(state.message);
      }
  }, [state]);

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen  bg-amber-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className='flex items-center justify-center'>
    <form action={action}>
      <section className='bg-amber-200 p-8 mt-20 rounded-lg shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700'>
      <div className='flex flex-col space-y-4'>
      <h2 className="text-xl md:text-2xl text-primary mb-4 self-center">Sign Up</h2>
      <div className=' flex flex-col'>
        <label htmlFor="name" className="block text-xs md:text-xl text-muted mb-1">Name</label>
        <input id="userName" name="userName" placeholder="John Doe" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm text-xs md:text-xl" />
      </div>
      {state?.error?.userName && <p className='text-fg-primary'>{state.error.userName}</p>}
      <div className=' flex flex-col'>
        <label htmlFor="name" className="block text-xs md:text-xl text-muted mb-1">Name</label>
        <select id="userRole" name="userRole" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm text-xs md:text-xl">
          <option value={''}>Select a role</option>
          <option value={'user'}>user</option>
          <option value={'admin'}>admin</option>
        </select>
      </div>
      {state?.error?.userRole && <p className='text-fg-primary'>{state.error.userRole}</p>}
      <div className='flex flex-col'>
        <label htmlFor="email" className="block text-xs md:text-xl text-muted mb-1">Email</label>
        <input id="userEmail" name="userEmail" placeholder="johndoe@gmail.com" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm text-xs md:text-xl"/>
      </div>
      {state?.error?.userEmail && <p className='text-fg-primary'>{state.error.userEmail}</p>}
 
      <div className='flex flex-col'>
        <label htmlFor="password" className="block text-xs md:text-xl text-muted mb-1">Password</label>
        <input id="userPassword" name="userPassword" placeholder='******' type="password" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm text-xs md:text-xl"/>
        <div className='gap-2 p-3'>
        <li className='text-primary/70'>Must contain one special character</li>
        <li className='text-primary/70'>Must contain at least one letter</li>
        <li className='text-primary/70'>Must contain at least one number</li>
        <li className='text-primary/70'>Minimum 8 characters</li>
        </div>
      </div>
       {state?.error?.userPassword && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.error.userPassword.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <Link href='/sign-in' className='underline text-muted text-xs md:text-xl mt-4 self-center'>Sign-in with an account</Link>
      <button className='cursor-pointer text-xs md:text-xl rounded-2xl bg-primary py-2 text-bg-secondary mt-4 hover:bg-fg-primary ease-in-out duration-700' disabled={pending} type="submit">
        {pending? 'Creating...' : 'Create Account'}
      </button>
      </div>
      </section>
    </form>
   </div>
  </div>
  </MaxWidthWrapper> 
  )
}