import { verifySession } from '@/app/lib/verifysession';
import { NavbarLoggedOut } from './navbarlogout';
import { NavbarLoggedIn } from './navbarlogin';
import MobileNavLoggedIn from './mobilenavloggedin';
import MobileNavLoggedOut from './mobilenavloggedout';
import MobileNavAdmin from './mobilenav-admin'

export default async function Navbar() {
    const session = await verifySession();
    const userId = session?.userId
    const role = session?.userRole === 'admin'

    return (
        <>
         {userId? 
         (<>{role? 
         (<div  className='flex flex-row justify-evenly items-center inset-0 fixed bg-amber-50 shadow-xl shadow-black-100/45 h-3 py-7 md:py-8 xl:py-10 z-20'>
        <MobileNavAdmin/>
        <NavbarLoggedIn/>
        </div>)
         :(<div  className='flex flex-row justify-evenly items-center inset-0 fixed bg-amber-50 shadow-xl shadow-black-100/45 h-3 py-7 md:py-8 xl:py-10 z-20'>
        <MobileNavLoggedIn/>
        <NavbarLoggedIn/>
        </div>)}</>)
        :(     <div  className='flex flex-row justify-evenly items-center inset-0 fixed bg-amber-50 shadow-xl shadow-black-100/45 h-3 py-7 md:py-8 xl:py-10 z-20'>
        <MobileNavLoggedOut/>
        <NavbarLoggedOut/>
        </div>)}    
        </>
        
    )


}

