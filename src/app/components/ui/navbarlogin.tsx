'use client'
import Link from "next/link"
import {Agbalumo} from "next/font/google"
import {useState} from 'react'
import {useRef} from 'react'
import {AiOutlineUp} from 'react-icons/ai'
import {cn} from 'cn'
import { usePathname } from "next/navigation";
import MobileNavLoggedIn from './mobilenavloggedin';
import {Cart} from './cart'
import {Signout} from './sign-out'

const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});


const navigationLoggedIn = [
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
        label: <Signout/>,
        href: ''
      }
    ]
   },
   {
    label: 'About',
    value: 'about',
    href: '/About'
   },

   {
     label: <div>The<span className={`${agbalumoRegular.className} text-2xs md:text-xl xl:text-2xl`}>Bread</span>Co</div>,
     value: 'logo',
     href: '/',
   },

   {
     label: 'Products',
     value: 'products',
     href: '/Products',
   },

   {
    label: 'Contacts',
    value: 'contacts',
    href: '/Contacts'
   },

]



export function NavbarLoggedIn () {
      const pathName = usePathname();
      const [openDropdown, setOpenDropdown] = useState<number | null>(null);
      const navbarRef = useRef<HTMLDivElement>(null);

    
    const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <nav
     ref={navbarRef} >
        <ul className="hidden md:flex inset-0 m-0 p-0 top-full w-full h-16 relative justify-center items-center">
        <div className="fixed right-2 lg:right-4 xl:right-12 top-10 xl:top-12 bg-amber-100 h-14 w-14 xl:h-18 xl:w-18 rounded-full shadow cursor-pointer hover:shadow-2xl">
          <div className="self-center mt-2 xl:mt-3 cursor-pointer">
          <Cart></Cart>
          </div>
        </div>
               {navigationLoggedIn.map((item, index) => (
             <li key={index} className="relative justify-center items-center">
            {item.dropdownItem ? (
            
              <button
                onClick={() => toggleDropdown(index)}
                aria-expanded={openDropdown === index}
                className={cn('flex py-4 px-4 lg:px-8 gap-2 text-xs md:text-xl xl:text-2xl xl:py-4 xl:px-10 duration-500 items-center hover:text-red-700 cursor-pointer',
                    {'text-red-700' : pathName===item.href}
                )}>
                {item.label}
                <AiOutlineUp className={cn('md:h-6 md:w-3 xl:h-6 xl:w-4 transition-all',
              {
                '-rotate-180': openDropdown===index,
              })}>
                
                </AiOutlineUp>
              </button>
            ) : (
          
              <Link
                href={item.href}
                className={cn('flex px-6 lg:px-11 py-4 text-xs md:text-xl xl:py-4 xl:px-12 xl:text-2xl self-center transition duration-500 ease-in-out hover:text-red-700', 
                    {'text-red-700' : pathName===item.href}
                )}
              >
                {item.label}
              </Link>
            )}

            {/* Dropdown Menu Overlay */}
                {item.dropdownItem && openDropdown === index && (
              <ul
                className='absolute top-full left-0 bg-amber-50 list-none m-0 z-5 animate-slidedown duration-1000 text-center ease-in-out justify-center items-center md:-ml-8 lg:-ml-8 xl:px-6 py-5 shadow-xl'
              >
                {item.dropdownItem.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={subItem.href}
                      onClick={() => setOpenDropdown(null)}
                      className={cn(`hover:text-primary duration-700 text-muted ease-in-out block text-xl py-2 md:w-38 lg:w-45 xl:text-2xl`
                      ,{'text-primary' : pathName.startsWith(subItem.href)}
                    )}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
       
        </ul>
    </nav>

    
  )
}

