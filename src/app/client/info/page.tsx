'use client'
import MaxWidthWrapper from '../../components/maxwidthwrapper';
import { UserInfoFormState } from "@/app/lib/definitions";
import  {userInfo}  from "../../actions/user-info";
import { useActionState, useEffect, useState } from "react";
import {toast} from 'react-toastify'



interface List {
  userName: Name;
  userCity: string;
  userAddress: string;
  userPostalCode: string;
}

interface Name {
  userName: string;
}

interface InfoList {
    initialList: List;
}

const initialSate: UserInfoFormState = {
    status: 'loading'
}


export default function UpdateInfo({initialList}: InfoList) {
    const [state, action, pending] = useActionState(userInfo, initialSate)
    const [Info, setUserInfo] = useState<List> (initialList)

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
    <div className='flex flex-col justify-center items-center p-4 bg-amber-200 border-8 rounded-2xl border-amber-50 shadow-sm hover:shadow-2xl duration-500 ease-in-out'>
    <form action={action} className="grid grid-cols-1 gap-4 items-center h-full justify-center w-80 p-8 border-amber-50">
      <div className='flex flex-col'>
      <label>Name</label>
      <p className="border p-2 bg-amber-100 text-muted w-65">
      {Info.userName.userName}</p>
      </div>
       <div className='flex flex-col'>
      <label>Address</label>
      <p className="border p-2 bg-amber-100 text-muted">
      {Info.userAddress}</p>
      </div>
       <div className='flex flex-col'>
      <label>City</label>
      <p className="border p-2 bg-amber-100 text-muted">
      {Info.userCity}</p>
      </div>
       <div className='flex flex-col'>
      <label>Postal Code</label>
      <p className="border p-2 bg-amber-100 text-muted">
      {Info.userPostalCode}</p>
      </div>

      <div className='my-5 border border-amber-50'></div>

      <div className='flex flex-col'>
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 bg-amber-100 text-muted"
        name='userName'
      />
      </div>
      {state?.error?.userName && <p className="text-fg-primary">{state.error.userName}</p>}
      <div className='flex flex-col'>
      <label>Address</label>
      <input
      placeholder="Address"
      className='border p-2 bg-amber-100 text-muted'
      name='userAddress'
      required
      />
      </div>
      {state?.error?.userAddress && <p className="text-fg-primary">{state.error.userAddress}</p>}
      <div className='flex flex-col'>
        <label>City</label>
        <select
        className="border p-2 bg-amber-100 text-muted"
        name='userCity'
        required
        >
        <option value={''}>Select a city</option>
        <option value={'Somewhere'}>Somewhere</option>
        <option value={'Someplace'}>Someplace</option>
        <option value={'Everywhere'}>Everywhere</option>
        <option value={'Mars'}>Mars</option>
        <option value={'Earth'}>Earth</option>
        </select>
      </div>
        {state?.error?.userCity && <p className="text-fg-primary">{state.error.userCity}</p>}
      <div className='flex flex-col'>
        <label>Postal Code</label>
        <input
        name='userPostalCode'
        type='string'
        placeholder="eg: 70000"
        className="border p-2 bg-amber-100 text-muted"
        required
      />
      </div>
       {state?.error?.userPostalCode && <p className="text-fg-primary">{state.error.userPostalCode}</p>}
      <button disabled={pending} type="submit" className="bg-primary text-bg-secondary p-2 mt-4 rounded-2xl hover:bg-fg-primary duration-500 ease-in-out">
        {pending? 'Updating...': 'Update Info'}
      </button>
    </form>
    </div>
     </div>
    )
}
