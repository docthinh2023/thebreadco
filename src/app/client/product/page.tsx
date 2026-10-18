"use client"
import {Suspense, useEffect, useState} from 'react';
import {formatPrice} from '../../lib/utils'
import MaxWidthWrapper from '../../components/maxwidthwrapper';
import Link from 'next/link';
import { AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import { AddToCartButton } from '../../components/ui/addtocart';
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {usePathname} from 'next/navigation'
import path from 'node:path';

interface Product {
    _id: string;
    id: number;
    productName: string;
    productCategory: string;
    productImage: string;
    productStatus: string;
    productPrice: number;
    productSellVolumn: number;
    productDescription: string;
}

interface ProductProps {
    initialProduct: Product[]
}

export default function ProductPage({initialProduct}: ProductProps) {
  const [products, setProducts] = useState<Product[]>(initialProduct);
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const slicedPath = segments.slice(0).join('/')
  const productLinks = [
    {
      Name: 'Bread'
    },
    {
      Name: 'Cake'
    },
    {
      Name: 'Donuts'
    },
    {
      Name: 'Cookies'
    },
    {
      Name: 'Tart'
    },
    {
      Name: 'Cheesecake'
    },
  ]

  const updateQuantity = (index: number, change: number) => {
    setProducts((prevItems) =>
      prevItems.map((item, i) => {    
        if (i === index) {
          const newQty = item.productSellVolumn + change;
          return { ...item, productSellVolumn: newQty < 1 ? 1 : newQty };
        }
        return item;
      },
     
    )
    );
  };

  return (
   <MaxWidthWrapper>
     <aside id="default-sidebar" className="mt-10 fixed py-3 hidden md:flex md:top-20 xl:top-25 left-0 z-5 h-full transition-transform -translate-x-full sm:translate-x-0 bg-amber-50">
       <div className="h-screen xl:px-1 px-3 overflow-y-auto border-e border-default">
        <ul className="space-y-2 text-muted">{productLinks.map((product, index)=>(
          <li key={index}>
             <Link href={`/Products/${product.Name}`} className="flex text-center items-center px-4 xl:pr-2 py-1.5 text-sm xl:text-xl rounded-base ease-in-out duration-500 hover:text-primary group">
               <span className="">{product.Name}</span>
             </Link>
          </li>
        ))}
        </ul>
       </div>
      </aside>
     <main className="py-10 px-3 md:py-8 md:pl-0 md:pr-4 xl:pr-3 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen">
       <div className='md:ml-43 flex flex-col pb-3'>
      {slicedPath!=='Products' ?  (<Link href='/Products' className='text-2xl p-3 flex flex-row underline items-center gap-2 hover:text-fg-primary ease-in-out duration-500'><AiOutlineArrowLeft className='text-xl'></AiOutlineArrowLeft>{slicedPath}</Link>) 
      : (<Link href='/Products' className='text-2xl p-3 flex flex-row underline items-center gap-2 hover:text-fg-primary ease-in-out duration-500'>Product</Link>)} 
       <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products?.map((product, index) => (
        <li key={product._id} className="border p-2 rounded shadow ease-in-out duration-1000 hover:shadow-2xl">
        <Suspense fallback={<p className='bg-amber-100 border-2 text-primary'>Loading products...</p>}>
        <div className='p-2 grid grid-cols-2 gap-8 md:gap-3 lg:gap-12 bg-amber-200'>
          <div className='flex flex-col gap-2 w-60 md:w-7
          0 lg:w-70'>
            <div className='flex flex-col items-start gap-2 w-70'>
            <h2 className="font-semibold text-xl md:text-3xs lg:text-xl">{product.productName}</h2>
            <p className="text-muted text-xs md:text-2xs">{product.productStatus}</p>
            <p className="text-gray-600 text-2xs md:text-xl">{formatPrice(`${product.productPrice}`)}</p>
            </div>     
            <div className='grid grid-rows-2 justify-between gap-4 text-bg-secondary text-2xs md:text-3xs w-30'>
                <div className='grid grid-cols-3 gap-2'>
                  <button onClick={() => {updateQuantity(index, 1)}} className='hover:bg-fg-primary ease-in-out duration-500 bg-bg-primary rounded-full flex justify-center items-center text-bg-secondary cursor-pointer'>
                  <AiOutlinePlus></AiOutlinePlus>
                  </button>
                  <div  className='flex justify-center items-center w-8 text-muted'>{product.productSellVolumn}</div>
                  <button onClick={() => {updateQuantity(index, -1)}}  className='hover:bg-fg-primary ease-in-out duration-500 bg-bg-primary rounded-full flex justify-center items-center text-bg-secondary cursor-pointer'>
                  <AiOutlineMinus></AiOutlineMinus>
                  </button>
                </div>
                <AddToCartButton product={{id:index, title: product.productName, price: product.productPrice, quantity: product.productSellVolumn}}></AddToCartButton>
            </div>
          </div>
          <div className='flex justify-center w-30 h-30 xl:w-35 xl:h-35'>
            <img alt={product.productName} src={product.productImage} className='w-auto h-auto'/>
          </div>
        </div>
        <div className={`flex border-t-3 pt-4 mt-4`}>
             <p className='text-gray-600 text-xs md:text-3xs'>{product.productDescription}</p>
        </div>
        </Suspense>
          </li>
        ))}
      </ul>
      </div>
     </main>
    </MaxWidthWrapper>
  );
}
