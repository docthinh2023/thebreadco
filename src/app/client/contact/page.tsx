'use client'
import { AiFillClockCircle, AiFillEnvironment, AiFillMessage, AiFillPhone, } from "react-icons/ai";
import MaxWidthWrapper from "../../components/maxwidthwrapper";
import Image from 'next/image'

export default function ContactsPage () {

    return (
        <MaxWidthWrapper>
        <main className="grid grid-cols-1 md:grid-cols-1 p-10 md:p-14 justify-items-center content-center gap-1 md:gap-8">
          <section className="grid grid-cols-2  xl:grid-cols-4 p-5 min-w-100 gap-3 md:p-2 md:gap-10  justify-items-center content-center mt-10 md:mt-15">
             <div className="flex flex-col justify-center items-center gap-1 md:gap-4 w-45 h-28 md:w-xs md:h-50 bg-amber-200 border-6 border-amber-50 rounded-xl shadow-sm hover:shadow-2xl ease-in-out duration-500">
                <div className="bg-amber-50 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm text-primary items-center justify-center flex">
                <AiFillEnvironment className="w-5 h-5 md:w-8 md:h-8"></AiFillEnvironment>
                </div>
                <h1 className="text-sm md:text-2xl">Ho Chi Minh city</h1>
                <p className="text-xs md:text-xl text-muted">123 street 4 district 5</p>
             </div>
             <div className="flex flex-col justify-center items-center gap-1 md:gap-4 w-45 h-28 md:w-xs md:h-50 bg-amber-200 border-6 border-amber-50 rounded-xl shadow-sm hover:shadow-2xl ease-in-out duration-500">
                 <div className="bg-amber-50 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm text-primary items-center justify-center flex">
                <AiFillPhone className="w-5 h-5 md:w-8 md:h-8"></AiFillPhone>
                </div>
                <h1 className="text-sm md:text-2xl">Phone number</h1>
                <p className="text-xs md:text-xl text-muted">0123 456 789</p>
             </div>
             <div className="flex flex-col justify-center items-center gap-1 md:gap-4 w-45 h-28 md:w-xs md:h-50 bg-amber-200 border-6 border-amber-50 rounded-xl shadow-sm hover:shadow-2xl ease-in-out duration-500">
                 <div className="bg-amber-50 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm text-primary items-center justify-center flex">
                <AiFillMessage className="w-5 h-5 md:w-8 md:h-8"></AiFillMessage>
                </div>
                <h1 className="text-sm md:text-2xl">Email address</h1>
                <p className="text-xs md:text-xl text-muted">thebreadco@gmail.com</p>
             </div>
             <div className="flex flex-col justify-center items-center gap-1 md:gap-4 w-45 h-28 md:w-xs md:h-50 bg-amber-200 border-6 border-amber-50 rounded-xl shadow-sm hover:shadow-2xl ease-in-out duration-500">
                 <div className="bg-amber-50 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-sm text-primary items-center justify-center flex">
                <AiFillClockCircle className="w-5 h-5 md:w-8 md:h-8"></AiFillClockCircle>
                </div>
                <h1 className="text-sm md:text-2xl">Working hours</h1>
                <p className="text-xs md:text-xl text-muted">Mon - Sun: 8:00 - 22:00</p>
             </div>
          </section>
          <div className="w-full xl:max-w-8xl flex flex-col xl:flex-row gap-5 md:gap-10 xl:gap-5 justify-center">
          <section className="justify-center items-center grid grid-cols-1 bg-amber-200 p-6 gap-3 w-full xl:max-w-xl rounded-xl shadow-sm border-6 border-amber-50 hover:shadow-2xl ease-in-out duration-700">
           <div className="flex flex-col gap-10">
           <h1 className="text-center text-sm md:text-xl">Leave us a message!</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 content-center">
            <div className="">
                <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">Name</label>
                <input type="text" id="name" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" />
            </div>
              <div className="">
                <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">Email</label>
                <input type="text" id="email" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" />
            </div>
            <div className="">
                <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">Phone</label>
                <input type="text" id="phone" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" />
            </div>
            <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-muted mb-1">Message</label>
                <input type="text" id="address" className="w-full px-3 py-2 rounded-md border bg-amber-100 border-amber-50 shadow-sm text-sm" />
            </div>
            <button type="submit" className="text-bg-secondary cursor-pointer hover:bg-fg-primary duration-700 ease-in-out bg-primary rounded-2xl text-sm md:text-xl block h-10 mt-3 md:col-span-2">Send Message</button>
           </div>
           </div>
          </section>
          <div className="flex p-4 gap-4 w-auto h-auto border-6 border-amber-50 bg-amber-200 rounded-xl object-cover shadow-sm flex-col hover:shadow-2xl ease-in-out duration-500">
            <h1 className="text-sm md:text-xl self-center">Or... drop by our location.</h1>
            <div className="flex w-auto h-auto">
            <Image alt='Cookies' loading='eager' src='/MapMockup.jpeg' width={1200} height={600}/>
            </div>
          </div>
         </div>
        </main>
        </MaxWidthWrapper>
    )
}