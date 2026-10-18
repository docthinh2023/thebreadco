'use client'

import { ChangePasswordFormState } from "@/app/lib/definitions";
import { ChangeUserPassword } from "../../actions/changepassword";
import { useActionState, useEffect} from "react";
import {toast} from 'react-toastify'

const initialSate: ChangePasswordFormState = {
    status: 'loading'
}

export default function ChangePassword() {
    const [state, action, pending] = useActionState(ChangeUserPassword, initialSate)
    
    useEffect(() => {
    if(!state) return;
      if (state.status === 'success' && state.message) {
        toast.success(state.message);
      } else if (state.status === 'error' && state.message) {
        toast.error(state.message);
      }
  }, [state]);
    
    return (
   <div className='justify-items-center self-center content-center'>
    <div className='flex flex-col justify-center items-center min-w-xs md:max-w-xl p-4 bg-amber-200 border-8 rounded-2xl border-amber-50 shadow-sm hover:shadow-2xl duration-500 ease-in-out'>
    <form action={action} className="grid grid-cols-1 gap-4 items-center h-full justify-center">
      <div className='flex flex-col'>
      <label>Password</label>
      <input
        type='password'
        placeholder="******"
        className="border p-2 bg-amber-100 text-muted"
        name='userPassword'
        required
      />
      </div>
          {state?.error?.userPassword && <p className="text-fg-primary">{state.error.userPassword}</p>}
      <div className='flex flex-col'>
      <label>New Password</label>
      <input
      className='border p-2 bg-amber-100 text-muted'
      name='userNewPassword'
      type='password'
      placeholder='******'
      required
      />
      </div>
      {state?.error?.userNewPassword && <p className="text-fg-primary">{state.error.userNewPassword}</p>}
      <div className='flex flex-col'>
        <label>Confirm New Password</label>
        <input
        name='userConfirmedPassword'
        type='password'
        placeholder='******'
        className="border p-2 bg-amber-100 text-muted"
        required
      />
      </div>
          {state?.error?.userConfirmedPassword && <p className="text-fg-primary">{state.error.userConfirmedPassword}</p>}
      <button disabled={pending} type="submit" className="bg-primary text-bg-secondary p-2 mt-4 rounded-2xl hover:bg-fg-primary duration-500 ease-in-out">
        {pending? 'Updating' : 'Update Password'}
      </button>
    </form>
    </div>
     </div>
    )
}