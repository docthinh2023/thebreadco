'use client'
import {ChangeEvent, useActionState, useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { productUpdate } from '../../actions/updateproduct';
import { UpdateProductFormState } from '../../lib/definitions';

interface List {
    productName: string;
    productCategory: string;
}

interface ListName {
    productNameList: List[];
}

const initialSate: UpdateProductFormState = {
    status: 'loading'
}


export default function UpdateProductForm({productNameList}: ListName) {
  const [state, action, pending] = useActionState(productUpdate, initialSate)
  const [category, setCategory] = useState<string>()
  const [productName, getProductName] = useState<List[]>(productNameList)
  const [name, setName] = useState<string>()
  
  const pickedCategory = (event: ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value)
  }

  const pickedName = (event: ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value)
  }
  
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
        <label>Category</label>
        <select
        className="border p-2 bg-amber-100 text-muted"
        name='productCategory'
        value={category}
        required
        onChange={pickedCategory}
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
      {!category?(
     <>
      <div className='flex flex-col'>
      <label>Product Name</label>
      <select
        className="border p-2 bg-gray-500/25 text-muted"
        name='productName'
        disabled>
        </select>
     </div>
      </>):
      (
     <>
      <div className='flex flex-col'>
      <label>Product Name</label>
      <select
        value={name}
        onChange={pickedName}
        className="border p-2 bg-amber-100 text-muted"
        name='productName'
        required
      >{productName
        .filter((product) =>
        product.productCategory.toLowerCase() === category?.toLowerCase()
        )
        .map((product) => (
       <option key={product.productName} value={product.productName}>
       {product.productName}
       </option>
       ))}</select> 
      </div>
      </>)}
      {category === '' || !category? 
      (<div className='flex-col hidden'>
      <label>Sell volumn</label>
      <input
      type='hidden'
      value={1}
      placeholder="Number of items to sell"
      className='border p-2 bg-gray-500/25 text-muted'
      disabled
      />
      </div>):
      (<div className='hidden flex-col'>
      <label>Sell volumn</label>
      <input
      type='hidden'
      value={1}
      placeholder="number of items to sell"
      className='border p-2 bg-amber-100 text-muted'
      name='productSellVolumn'
      required
      />
      </div>)}
      {state?.error?.productSellVolumn && <p className='text-fg-primary'>{state.error.productSellVolumn}</p>}
      {category === '' || !category? 
      (<div className='flex flex-col'>
      <label>Price</label>
      <input
        min={0}
        placeholder="Price"
        className="border p-2 bg-gray-500/25 text-muted"
        disabled
      />
      </div>):(
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
      )}
      {state?.error?.productPrice && <p className='text-fg-primary'>{state.error.productPrice}</p>}

      {category === '' || !category? 
      (<div className='flex flex-col'>
        <label>Status</label>
        <select
        className="border p-2 bg-gray-500/25 text-muted/40"
        name='productStatus'
        disabled
        >
        <option value={''}>Select a status</option>
        <option value={'In stock'}>In stock</option>
        <option value={'Out of stock'}>Out of stock</option>
        </select>
      </div>):(
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
      )}
        {state?.error?.productStatus && <p className='text-fg-primary'>{state.error.productStatus}</p>}
      {category === '' || !category? 
      (<div className='flex flex-col'>
        <label>Description</label>
        <input
        type='string'
        placeholder="Description"
        className="border p-2 bg-gray-500/25 text-muted"
        disabled
      />
      </div>):(
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
      )}
     {category === '' || !category? 
     (<div className="flex flex-col">
       <label htmlFor="">Upload image</label>
       <input 
          type="file" 
          name="image" 
          accept="image/*" 
          disabled
          className='border p-2 bg-gray-500/25 text-muted/40'
        />
    </div>):(
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
    )}
      {category === '' || !category? 
      (<button type="submit" disabled className="bg-gray-400/40 text-gray-50 p-2 mt-4 rounded-2xl">
        Button disabled
      </button>):(
        <button type="submit" className="bg-primary text-bg-secondary p-2 mt-4 rounded-2xl hover:bg-fg-primary duration-500 ease-in-out">
        {pending? 'Updating...' : 'Update Product'}
      </button>
      )}
    </form>
    </div> 
     </div>
  );
}
