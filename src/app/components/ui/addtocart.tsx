'use client'
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useEffect, useState} from 'react'
import { useCartStore, Product } from "@/app/actions/usecart";



export const AddToCartButton = ({product}: {product: Product}) => {

  const addToCart = useCartStore(((state) => state.addItem));  
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 700)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <button
      onClick={() => {
        setIsSuccess(true), addToCart(product)
      }}
      className='bg-bg-primary w-25 text-bg-secondary text-xs md:text-xs flex flex-row justify-center items-center gap-2 rounded-2xl cursor-pointer hover:bg-fg-primary ease-in-out duration-700 focus:outline-none focus:ring-2 focus:ring-offset-2'>
      {isSuccess ? 'Added!' : 'Add'}
    <AiOutlineShoppingCart></AiOutlineShoppingCart>
    </button>
  )
}