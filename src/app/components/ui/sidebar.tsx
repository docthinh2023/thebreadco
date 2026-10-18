'use client'

import Link from 'next/link'
import { useState } from 'react';

interface LinkRef {
  Name: string;
}

interface LinkProps {
  initialLinks: LinkRef[]
}


export default function Sidebar({initialLinks}: LinkProps) {
   const [Links, setLinks] = useState<LinkRef[]>(initialLinks)
   

    return (
      <aside id="default-sidebar" className="fixed py-3 hidden md:flex md:top-20 xl:top-25 left-0 z-5 h-full transition-transform -translate-x-full sm:translate-x-0 bg-amber-50">
       <div className="h-screen px-6 xl:px-8 overflow-y-auto border-e border-default">
        <ul className="space-y-4 mt-5 font-medium text-muted">{Links?.map((link, index)=>(
            <li key={index}>
             <Link href={`/Profile/${link.Name}`} className="flex items-center px-2 py-1.5 text-sm xl:text-xl rounded-base ease-in-out duration-500 hover:text-primary group">
               <span className="">{link.Name}</span>
             </Link>
          </li>
        ))}
        </ul>
       </div>
      </aside>    
    )
}