'use client'
import {useState} from 'react'
import MaxWidthWrapper from '../maxwidthwrapper';
import Link from 'next/link';
import {Agbalumo} from "next/font/google"
import { AiOutlineHome, AiOutlinePhone } from 'react-icons/ai';

const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});


export default function Footer() {

    return (
        <section className="hidden md:grid grid-cols-4 z-20 content-center justify-items-center w-full bg-amber-50 bottom-0 left-0 right-0 text-xs md:text-xl p-6">
            <div className="grid grid-col-1">
               <div className='text-muted text-xl flex flex-col text-center items-center justify-center'>
               <h1 className='md:text-xl lg:text-2xl text-primary'>The<span className={`${agbalumoRegular.className} md:text-2xl lg:text-3xl`}>Bread</span>Co</h1>
               </div>
            </div>
            <div className='flex flex-col gap-5'>Navigation
               <div className='flex flex-col gap-3 text-muted text-sm'>
                <Link href='/' className='hover:underline hover:text-primary ease-in-out duration-500'>Home</Link>
                <Link href='/About' className='hover:underline hover:text-primary ease-in-out duration-500'>About</Link>
                <Link href='/Contacts' className='hover:underline hover:text-primary ease-in-out duration-500'>Location</Link>
                <Link href='/Products' className='hover:underline hover:text-primary ease-in-out duration-500'>Product</Link>
               </div>
            </div>
            <div className='flex flex-col gap-5'>Products
                <div className='flex flex-col gap-3 text-muted text-sm'>
                 <Link href='/Products/Donuts' className='hover:underline hover:text-primary ease-in-out duration-500'>Donuts</Link>
                 <Link href='/Products/Cake' className='hover:underline hover:text-primary ease-in-out duration-500'>Cake</Link>
                 <Link href='/Products/Cookies' className='hover:underline hover:text-primary ease-in-out duration-500'>Cookies</Link>
                 <Link href='/Products/Tart' className='hover:underline hover:text-primary ease-in-out duration-500'>Tart</Link>
                 <Link href='/Products/Bread' className='hover:underline hover:text-primary ease-in-out duration-500'>Bread</Link>
                 <Link href='/Products/Cheesecake' className='hover:underline hover:text-primary ease-in-out duration-500'>Cheesecake</Link>
                </div>
            </div>
            <div className='flex flex-col gap-5'>Contacts
                <div className='flex flex-col gap-3 text-muted text-sm'>
                    <div className='flex flex-row gap-2'>
                    <AiOutlinePhone></AiOutlinePhone>
                    <p>0123.456.789</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                    <AiOutlineHome></AiOutlineHome>
                    <p>123 street 4 district 5</p>
                    </div>
                </div>
            </div>
        </section>
    )
}