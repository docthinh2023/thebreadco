'use client'

import MaxWidthWrapper from '../../components/maxwidthwrapper';
import ChangePassword from '../../components/ui/changepassword-info';
import Link from 'next/link'

  


  
export default function ChangePasswordPage() {
    
 

    return (
     <MaxWidthWrapper>
      <aside id="default-sidebar" className="fixed py-3 hidden md:flex md:top-20 xl:top-25 left-0 z-5 h-full transition-transform -translate-x-full sm:translate-x-0 bg-amber-50">
       <div className="h-screen px-6 xl:px-8 overflow-y-auto border-e border-default">
        <ul className="space-y-4 mt-5 font-medium text-muted">
          <li>
             <Link href="/Profile" className="flex items-center px-2 py-1.5 text-sm xl:text-xl rounded-base ease-in-out duration-500 hover:text-primary group">
               <span className="ms-3">Info</span>
             </Link>
          </li>
         <li>
             <Link href="/Proile/Invoice" className="flex items-center px-2 py-1.5 text-sm xl:text-xl rounded-base ease-in-out duration-500 hover:text-primary group">
               <span className="flex-1 ms-3 whitespace-nowrap">Invoice</span>
            </Link>
         </li>
         <li>
            <Link href="/Profile/Update-info" className="flex items-center px-2 py-1.5 text-sm xl:text-xl rounded-base ease-in-out duration-500 hover:text-primary group">
               <span className="flex-1 ms-3 whitespace-nowrap">Update Info</span>
            </Link>
         </li>
        </ul>
       </div>
      </aside>
       <div className='md:ml-43 flex flex-col self-center'>
         <section className="min-h-screen px-4 sm:px-6 lg:px-8 self-center flex justify-center items-center bg-black">
         <ChangePassword></ChangePassword>
         </section>
       </div>
     </MaxWidthWrapper>
  
    )

  }

  