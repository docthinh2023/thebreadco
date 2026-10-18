'use client'
import { AiOutlineUnorderedList, AiOutlineUp, AiOutlineClose } from "react-icons/ai";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {cn} from 'cn'
import {Agbalumo} from "next/font/google"
import {Cart} from './cart'
import { Signout } from "./sign-out";
import { registryItemSchema } from "shadcn/schema";

const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});


const navigationData = [
   {
    label: 'Profile',
    value: 'profile',
    href: '',
    dropdownItem: [
      {
        label: 'Info',
        href: '/Profile'
      },
      {
        label: 'Password',
        href: '/Profile/Password'
      }
    ]
   },
   {
    label: 'Home',
    value: 'home',
    href: '/'
   },
   {
     label: 'About',
     value: 'about' as const,
     href: '/About',
   },

   {
     label: 'Products',
     value: 'products' as const,
     href: '/Products',
     dropdownItem: [
        {
            label: 'Bread',
            href: '/Products/Bread',
        },

        {
            label: 'Tart',
            href: '/Products/Tart',
        },

        {
            label: 'Cheesecake',
            href: '/Products/Cheesecake',
        },

        {
            label: 'Cookie',
            href: '/Products/Cookies',
        },

        {
            label: 'Cake',
            href: '/Products/Cakes',
        },
        {
            label: 'Donut',
            href: '/Products/Donuts'
        }

     ]

   },

   {
    label: 'Contacts',
    value: 'contacts',
    href: '/Contacts'
   },

   {
    label: <Signout/>,
    value: 'signout',
    href: '',
   }
   
]

export default function MobileNavLoggedIn () {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isDropDownOpen, setisDropDownOpen] = useState<number | null>(null)

  const pathName = usePathname()

  // menu close when pathname is clicked
  useEffect(() => {
    setIsOpen(false)
  }, [pathName])

  // close menu when click on current path
  const closeOnCurrent = (href: string) => {
    if (pathName === href) {
      setIsOpen(false)
    }
  }

// toggle dropdown for nested items
const toggleDropdown = (index: number) => {
setisDropDownOpen(isDropDownOpen === index ? null : index);
};

  // remove scrollbar when menu opens
  useEffect(() => {
    if (isOpen)
      document.body.classList.add('overflow-hidden')
      else document.body.classList.remove('overflow-hidden')
  }, [isOpen])
 // when nav overlay is not opened, show mobilenav
  if (!isOpen)
    return (
     <div className='md:hidden flex flex-row w-full justify-evenly'>
      <button       
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden flex-start -m-2 inline-flex items-center justify-center rounded-md p-2 text-bg-primary gap-1'>
        <AiOutlineUnorderedList className={'mt-1 h-5 w-6 lg:h-8 lg:w-8 transition-all text-bg-primary'}>
        </AiOutlineUnorderedList>
      </button>
      <Link href='/' className=''>The<span className={`${agbalumoRegular.className} text-xl`}>Bread</span>Co</Link>
      <Cart/>
      </div>
    )
// else return nav overlay
return (
    <div>
      <div className='relative z-20 md:hidden'>
        <div className='fixed inset-0'/>
      </div>

      <div className='md:hidden fixed overflow-y-scroll overscroll-y-none inset-0 z-20 flex'>
        <div className='w-4/5'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-amber-50 pb-12 shadow-xl'>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-bg-primary'>
                <AiOutlineClose className='h-4 w-4' aria-hidden='true'/>
              </button>
            </div>

            <div className='mt-2'>
              <ul>
                {navigationData.map((item, index) => (
                  <li
                    key={index}
                    className='space-y-2 px-4 py-8'>
                      <div className='border-b border-black'>
                       {item.dropdownItem? ( 
                      <div className='-mb-px flex'>
                        <button 
                            onClick={() => toggleDropdown(index)}
                            aria-expanded={isDropDownOpen===index}
                            className='border-transparent text-primary whitespace-nowrap border-b text-base font-medium'
                           >
                          <div className={cn('flex flex-row gap-2', {'text-fg-primary': pathName===item.href})}>
                          {item.label}
                          <AiOutlineUp className={cn('h-6 w-4 transition-all',
                          {
                          '-rotate-180': isDropDownOpen===index,
                          })}>
                          </AiOutlineUp>
                          </div>
                          </button>
                      </div>
                    ):(
                       <Link href={item.href} className={cn(`border-transparent text-primary flex-1 whitespace-nowrap border-b py-8 font-medium`,
                            {'text-fg-primary' : pathName===item.href}
                           )}>
                        {item.label}
                       </Link>
                    )}
                    </div>
              
                   {item.dropdownItem && isDropDownOpen === index && (
                    <div className='justify-center grid grid-cols-2 pb-5 border-muted border-b pt-5 gap-y-5'>
                      {item.dropdownItem.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          className='group relative text-sm'>
                          <div className='relative overflow-hidden'>
                            <Link                              
                              href={subItem.href}
                              className={cn(`text-muted`, {'text-primary' : pathName.startsWith(subItem.href)})}
                            >
                            {subItem.label}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div> 
                   )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
)

}
