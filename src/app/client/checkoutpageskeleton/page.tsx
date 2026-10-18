'use client'

import MaxWidthWrapper from '../../components/maxwidthwrapper';
import {useCartStore} from '../../actions/usecart'
import {formatPrice} from '../../lib/utils';
import {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';



export default function CheckoutPageSkeleton() {
     const { items, getTotalPrice, clearCart, getTotalItems} = useCartStore();
     const ShippingFee = 50;
     const FinalPrice = ShippingFee + getTotalPrice()
     const totalAmount = FinalPrice
     const userItems = items
     const totalItems = +getTotalItems()
     const [isSuccess, setIsSuccess] = useState<boolean>(false)
     const [pressed, setPressed] = useState(true)

      const handleUseNewAddress= () => {
        setPressed(true)
      } 

      const handleUseCurrentAddress = () => {
        setPressed(false)
      }
     

       useEffect(() => {
       const timeout = setTimeout(() => {
      setIsSuccess(false)
       }, 700)

       return () => clearTimeout(timeout)
       }, [isSuccess])
        
      
        const handleSubmit = async () => {
        const request = fetch ('api/invoice', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({totalAmount: totalAmount, userItems: userItems, totalItems: totalItems})
        }).then((response) => {
          if(!response.ok) throw new Error ('Checkout Failed');
          const data = response.json()
          clearCart()
          return data        
        })
          
       
        toast.promise(request, {
          pending: 'Verifying data...',
          success: 'Checkout success!',
          error: 'Checkout failed. Something went wrong.'
        })

        redirect('/Invoice')
     }

  return (
    <MaxWidthWrapper>
    <div className="min-h-screen  bg-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          
          <div className="lg:col-span-7 space-y-8">          
                {/* Shipping address */}
            <section className="bg-amber-200 p-6 rounded-lg shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700">
              <h2 className="text-lg font-medium text-primary mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 gap-x-4">
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


              <button onClick={() => {handleSubmit(), setIsSuccess(true)}} className="w-full cursor-pointer mt-6 bg-primary hover:bg-fg-primary text-bg-secondary font-medium py-3 px-4 rounded-2xl shadow-sm ease-in-out duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2">
                {isSuccess? 'Check out confirmed!' : 'Check out'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
     </MaxWidthWrapper>
  )

}