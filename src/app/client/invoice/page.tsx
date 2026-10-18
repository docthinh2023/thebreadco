'use client'

import MaxWidthWrapper from '@/app/components/maxwidthwrapper';
import { useState } from 'react';
import { AiOutlineDown} from 'react-icons/ai'
import {formatPrice} from '../../lib/utils'
import { cn } from 'cn';


interface userItems{
    title: string;
    quantity:number;
    price:number
}
  
interface Invoice {
    userItems: userItems[];
    totalAmount: number;
    totalItems: number;
    createdAt: string;
} 

interface InvoiceProp {
   initialInvoice: Invoice[]
}


  
export default function InvoicePage({initialInvoice} : InvoiceProp) {
    const [invoice, setInvoice] = useState<Invoice[]>(initialInvoice)
    const [isActive, setIsActive] = useState<number|null>(null)
    
    const clickIsActive = (index: number) => {
    setIsActive(isActive === index ? null : index);
  };
    

    return (
     <MaxWidthWrapper>
      <main className="md:ml-10 xl:ml-30 py-10 px-3 md:py-8 md:pl-0 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen justify-center">
       <div className='md:ml-43 flex flex-col pb-3'>
         <section className='block justify-center items-center min-w-xs gap-5 text-sm md:text-xl text-center'>
         <label className='text-xl md:text-2xl mb-2 flex justify-center items-center text-fg-primary'>Invoice</label>
         {Object.keys(invoice).length===0?
         (<ul className='text-muted grid grid-cols-1 xl:self-center gap-6'>
          <li className='bg-amber-200 border-6 border-amber-50 shadow-sm rounded-xl p-8'>You currently have no invoice.</li>
         </ul>)         
         :(<ul className='text-muted grid grid-cols-1 xl:self-center gap-6'>{invoice.map((invoice, index) => (
            <li key={index} className=' bg-amber-200 border-6 border-amber-50 shadow-sm rounded-xl'>
               <div className='flex flex-col px-5 pt-5 gap-4'>
                <section id='Value' className='grid grid-cols-3 gap-4 p-2 justify-items-center content-center'>
                  <div className='flex flex-col justify-center items-center gap-2'>
                   <p className='flex items-start text-primary'>Date</p>
                   <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
                 </div>
                 <div className='flex flex-col md:w-xs items-center text-center gap-2'>
                   <p className='text-primary'>Items</p>
                   <p>{invoice.totalItems}</p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-2'>
                     <p className='flex text-primary'>Total</p>
                     <p>{formatPrice(invoice.totalAmount)}</p>
                  </div>
               </section>
               {isActive===index && (
                   <ul className='gap-5'>
                     {invoice.userItems.map((item, i) => (
                     <li key={i}>
                     <section className='grid grid-cols-3 gap-4 p-2 justify-items-center content-center border-amber-50 border-t-4'>
                     <div className='flex flex-col items-center justify-center gap-2'>
                     <p className='text-primary'>Name</p>
                     <p>{item.title}</p>
                     </div>
                      <div className='flex flex-col items-center justify-center gap-2'>
                     <p className='text-primary'>Quantity</p>
                     <p>{item.quantity}</p>
                     </div>
                      <div className='flex flex-col items-center justify-center gap-2'>
                     <p className='text-primary'>Price</p>
                     <p>{formatPrice(item.price)}</p>
                     </div>
                     </section>
                     </li>
                   ))}</ul>
               )}
                <AiOutlineDown onClick={()=>clickIsActive(index)} className={cn('block self-center h-6 w-12 md:h-8 md:w-16 text-primary hover:text-fg-primary ease-in-out duration-500 cursor-pointer bg-amber-50 rounded-full mb-3 md:mb-5 shadow-sm', {'-rotate-180': isActive===index})}></AiOutlineDown>
               </div>
            </li>
         ))}</ul>)} 
        </section>
       </div>
      </main>
     </MaxWidthWrapper>
  
    )

  }

  