'use client'

import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import Link from 'next/link'
import { Button} from './button'
import { formatPrice } from '../../lib/utils';
import {useCartStore} from '../../actions/usecart'

export const Cart = () => {
   const { items, getTotalItems, getTotalPrice, removeItem, clearCart } = useCartStore();
   const itemCount = items.length;
   
  return (
    <Sheet>
      <SheetTrigger className='group flex items-center p-2 cursor-pointer'>
        <AiOutlineShoppingCart
          aria-hidden='true'
          className='h-5 w-5 md:h-6 md:w-6 xl:h-8 xl:w-8 shrink-0 text-bg-primary ease-in-out duration-500 group-hover:text-red-700'
        />
        <span className='ml-2 text-xs md:text-3xs xl:text-xl font-medium text-bg-primary ease-in-out duration-500 group-hover:text-red-700'>
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className='flex flex-col pr-0 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle className={'flex justify-center text-2xs md:text-3xs xl:text-xl text-muted'}>Cart: {getTotalItems()} </SheetTitle>
        </SheetHeader>
         {itemCount > 0 ? (
            <div className='px-4 w-3xs self-center flex flex-col gap-4'>
            <div className='self-center'>
                 <ul className="grid grid-rows-1 gap-10 text-xs md:text-xs text-center">
                   {items.map((item, index) => (
                     <li key={index} className="flex flex-row gap-4 md:gap-10 w-full justify-between text-center items-center border-b-2">
                      <p className="w-20 text-muted">{item.title}</p>
                      <p className="text-muted">{formatPrice(item.price)}</p>
                      <p className="text-muted">{item.quantity}</p>
                      <p className="underline text-primary cursor-pointer hover:text-fg-primary ease-in-out duration-500" onClick={() => removeItem(item.id)}>Remove</p>
                     </li>
                     ))}
                   </ul>
            </div>
            <div className='space-y-5'>
                <div className='space-y-5 w-full'>
                     <div className='gap-16 md:gap-30 flex flex-row  text-muted text-xl justify-evenly w-full'>
                        <span>
                            Total
                        </span>
                        <span>
                            {formatPrice(getTotalPrice())}
                        </span>
                    </div>
                      <button onClick={clearCart} className='hover:text-fg-primary ease-in-out duration-500 underline cursor-pointer text-primary gap-25 flex flex-row justify-evenly w-full'>
                        <span>
                            Clear Cart
                        </span>
                      </button>
                </div>              
                <SheetFooter>
                    <Button>
                     <Link href= '/Checkout' className=' cursor-pointer bg-bg-primary rounded-2xl px-12 py-3 text-3xs ease-in-out duration-500 hover:bg-red-700 text-bg-secondary'>Continue to Checkout</Link>
                    </Button>
                </SheetFooter>
            </div>
            </div>
         ) : (<div className='flex w-3xs self-center h-full flex-col justify-center-safe mb-70 items-center space-y-5'>
              <h1 className='text-2xs md:text-4xs xl:text-2xl underline text-muted'>Cart is empty!</h1>
              <div className='flex self-center mb-4 w-16 h-16 md:h-20 md:w-20 xl:w-24 xl:h-24 bg-bg-primary rounded-full justify-center items-center shadow-xl'>
                <AiOutlineShoppingCart className='w-8 h-8 md:h-10 md:w-10 xl:w-12 xl:h-12 text-muted'/>
              </div>
              <p className='text-xs md:text-3xs xl:text-xl text-center text-muted'>Looks like you have no items in cart.</p>
              <button className='py-2  md:py-4 rounded-3xl w-full cursor-pointer text-xs md:text-3xs xl:text-xl bg-bg-primary text-bg-secondary shadow-xl ease-in-out duration-500 hover:bg-red-700'>
              <Link href='/Products' className='text-bg-secondary'>Start Shopping</Link>
              </button>
         </div>)}
      </SheetContent>
    </Sheet>
  )
}
