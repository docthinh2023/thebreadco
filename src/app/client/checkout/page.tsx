'use client'

import MaxWidthWrapper from '../../components/maxwidthwrapper';
import {useCartStore} from '../../actions/usecart'
import {formatPrice} from '../../lib/utils';
import {Fragment, useActionState, useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import {InvoiceFormState} from '@/app/lib/definitions'
import { CreateInvoice } from '@/app/actions/create-invoice';

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





const initialState: InvoiceFormState = {
  status: 'loading'
}






export default function CheckoutPage({initialList}:InfoList) {
     const [userInfo, setUserInfo] = useState<List> (initialList)
     const { items, getTotalPrice, clearCart, getTotalItems} = useCartStore();
     const ShippingFee = 50;
     const FinalPrice = ShippingFee + getTotalPrice()
     const totalAmount = FinalPrice
     const totalItems = +getTotalItems()
     const [pressed, setPressed] = useState(true)
     const [state, action, pending] = useActionState(CreateInvoice, initialState)

       useEffect(() => {
    if(!state) return;
      if (state.status === 'success' && state.message) {
        toast.success(state.message);
        clearCart()
      } else if (state.status === 'error' && state.message) {
        toast.error(state.message);
      }
    }, [state]);



      const handleUseNewAddress= () => {
        setPressed(true)
      } 

      const handleUseCurrentAddress = () => {
        setPressed(false)
      }
     



  return (
    <MaxWidthWrapper>
    <form action={action} className="min-h-screen  bg-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          
          <div className="lg:col-span-7 space-y-8">          
                {/* Shipping address */}
            <section className="bg-amber-200 p-6 rounded-lg shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700">
              <h2 className="text-lg font-medium text-primary mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-4">
                {pressed===true &&
                <>
                 <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1">Name</label>
                    <input type="text" placeholder="Name" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" name='userName' required/>
                 </div>
                 <div className='flex flex-col'>
                   <label className="block text-sm font-medium text-muted mb-1">Address</label>
                   <input placeholder="Address" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" name='userAddress' required/>
                 </div>
                 <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1" >City</label>
                    <select
                    className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" name='userCity' required>
                    <option value={''}>Select a city</option>
                    <option value={'Somewhere'}>Somewhere</option>
                    <option value={'Someplace'}>Someplace</option>
                    <option value={'Everywhere'}>Everywhere</option>
                    <option value={'Mars'}>Mars</option>
                    <option value={'Earth'}>Earth</option>
                    </select>
                 </div>
                  <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1" >Postal Code</label>
                    <input name='userPostalCode'  type='string' placeholder="eg: 70000" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" required />
                  </div>
                </>}
                {pressed===false &&
                <>
                  <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1">Name</label>
                    <p className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm">{userInfo.userName.userName}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1">Address</label>
                    <p className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm">{userInfo.userAddress}</p>
                  </div>
                  <div className='flex flex-col'>
                     <label className="block text-sm font-medium text-muted mb-1">City</label>
                     <p className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm">{userInfo.userCity}</p>
                  </div>
                  <div className='flex flex-col'>
                    <label className="block text-sm font-medium text-muted mb-1">Postal Code</label>
                    <p className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm">{userInfo.userPostalCode}</p>
                  </div>
                </>}
                 <div className='mt-4'>
                  <button onClick={handleUseCurrentAddress} className='w-full px-3 py-2  rounded-2xl shadow-sm bg-primary text-bg-secondary hover:bg-fg-primary font-medium ease-in-out duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2'>Use Current Address</button>
                 </div>
                 <div className='mt-4'>
                  <button onClick={handleUseNewAddress} className='w-full px-3 py-2  rounded-2xl shadow-sm bg-primary text-bg-secondary hover:bg-fg-primary font-medium ease-in-out duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2'>Use New Address</button>
                 </div>
              </div>
            </section>

              {/* Payment */}
            <section className="bg-amber-200 p-6 rounded-lg shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700">
              <h2 className="text-lg font-medium text-primary mb-4">Payment</h2>        
              <div className="space-y-4">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-muted mb-1">Card number</label>
                  <input type="text" id="card-number" placeholder="•••• •••• •••• ••••" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm sm:text-sm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-muted mb-1">Expiration date (MM/YY)</label>
                    <input type="text" id="expiration-date" placeholder="MM/YY" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-muted mb-1">CVC</label>
                    <input type="text" id="cvc" placeholder="CVC" className="w-full px-3 py-2 border bg-amber-100 border-amber-50 rounded-md shadow-sm sm:text-sm" />
                  </div>
                </div>
              </div>
            </section>
          </div>

              {/* Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-amber-200 p-6 rounded-lg shadow-sm border-6 border-amber-50 sticky top-8 hover:shadow-2xl ease-in-out duration-700">
              <h2 className="text-lg font-medium text-primary mb-6">Order summary</h2>
              
              <ul className="divide-y divide-amber-50 mb-6">
                {items.map((item) => (
                  <li key={item.id} className="flex py-4">
                    <div className="flex-auto">
                      <h3 className="text-sm font-medium text-muted">{item.title}</h3>
                      <p className="text-sm text-muted">Quantities {item.quantity}</p>
                    </div>
                    <p className="text-sm  font-medium text-muted">{formatPrice(getTotalPrice())}</p>
                  </li>
                ))}
              </ul>
  
              <div className="space-y-4 pt-4 border-t border-amber-50 text-sm text-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-muted">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-muted">{formatPrice(ShippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-primary pt-4 border-t border-amber-50">
                  <span>Total</span>
                  <span>{formatPrice(FinalPrice)}</span>
                </div>
              </div>

              
                <input type='hidden' name='totalItems' value={totalItems}></input>
                <input type='hidden' name='totalAmount' value={totalAmount}></input>
                <input type='hidden' name='userItems' value={JSON.stringify(items)}></input>
               
               
               {items.map((item,index)=> (                 
                 <Fragment key={index}>
                  <input type='hidden' name='id' value={item.id}></input>
                  <input type='hidden' name='title' value={item.title}></input>
                  <input type='hidden' name='price' value={item.price}></input>
                  <input type='hidden' name='quantity' value={item.quantity}></input>
                </Fragment>
                ))}
           
            
             

              <button type='submit' disabled={pending} className="w-full cursor-pointer mt-6 bg-primary hover:bg-fg-primary text-bg-secondary font-medium py-3 px-4 rounded-2xl shadow-sm ease-in-out duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                {pending? 'Checkout Confirmed!' : 'Check out'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </form>
     </MaxWidthWrapper>
  )

}