'use client'
import {useActionState, useEffect} from 'react'
import { productUpload } from '../../actions/postproduct';
import { PostProductFormState } from '@/app/lib/definitions';
import {toast} from 'react-toastify'

const initialSate: PostProductFormState = {
    status: 'loading'
}


export default function PostProductForm() {
  const [state, action, pending] = useActionState(productUpload, initialSate)
  
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
    <div className='flex flex-col justify-center items-center min-w-xs p-8 bg-amber-200 border-8 rounded-2xl border-amber-50 shadow-sm hover:shadow-2xl duration-500 ease-in-out'>
    <form action={action} className="grid grid-cols-1 gap-4 items-center h-full justify-center">
      <div className='flex flex-col'>
      <label>Name</label>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 bg-amber-100 text-muted"
        name='productName'
        required
      />
      </div>
      {state?.error?.productName && <p className='text-fg-primary'>{state.error.productName}</p>}
      <div className='hidden flex-col'>
      <label>Sell volumn</label>
      <input
      type='hidden'
      value={1}
      placeholder="Number of items to sell"
      className='border p-2 bg-amber-100 text-muted'
      name='productSellVolumn'
      required
      />
      </div>
      {state?.error?.productSellVolumn && <p className='text-fg-primary'>{state.error.productSellVolumn}</p>}
      <div className='flex flex-col'>
      <label>Price</label>
      <input
        min={0}
        placeholder="Price"
        className="border p-2 bg-amber-100 text-muted"
        name='productPrice'
        required
      />
      </div>
      {state?.error?.productPrice && <p className='text-fg-primary'>{state.error.productPrice}</p>}
      <div className='flex flex-col'>
        <label>Status</label>
        <select
        className="border p-2 bg-amber-100 text-muted"
        name='productStatus'
        required
        >
        <option value={''}>Select a status</option>
        <option value={'In stock'}>In stock</option>
        <option value={'Out of stock'}>Out of stock</option>
        </select>
      </div>
        {state?.error?.productStatus && <p className='text-fg-primary'>{state.error.productStatus}</p>}
      <div className='flex flex-col'>
        <label>Category</label>
        <select
        className="border p-2 bg-amber-100 text-muted"
        name='productCategory'
        required
        >
        <option value={''}>Select a category</option>
        <option value={'Bread'}>Bread</option>
        <option value={'Tart'}>Tart</option>
        <option value={'Cookies'}>Cookies</option>
        <option value={'Cake'}>Cake</option>
        <option value={'Cheesecake'}>Cheesecake</option>
        <option value={'Donuts'}>Donuts</option>
        </select>
      </div>
        {state?.error?.productCategory && <p className='text-fg-primary'>{state.error.productCategory}</p>}
      <div className='flex flex-col'>
        <label>Description</label>
        <input
        name='productDescription'
        type='string'
        placeholder="Description"
        className="border p-2 bg-amber-100 text-muted"
        required
      />
      </div>
    <div className="flex flex-col">
       <label htmlFor="">Upload image</label>
       <input 
          type="file" 
          name="image" 
          accept="image/*" 
          required 
          className='border p-2 bg-amber-100 text-muted'
        />
    </div>
      <button type="submit" className="bg-primary text-bg-secondary p-2 mt-4 rounded-2xl hover:bg-fg-primary duration-500 ease-in-out">
        {pending? 'Adding...' : 'Add Product'}
      </button>
    </form>
    </div>
     </div>
  );
}
