import clientPromise from '../../../lib/mongodb'
import ProductPage from '../client/product/page';
import {cache} from 'react'
import Link from 'next/link'
import {AiOutlineArrowLeft} from 'react-icons/ai'


const getProduct = cache(async () => {

    const client = await clientPromise
    const db = client.db('thebreadco')


    const result = await db.collection('Products').find({}).toArray()
    const products = result.map((product) => ({
      ...product,
      productName: product.productName? product.productName : null,
      productPrice: product.productPrice? product.productPrice : null,
      productSellVolumn: product.productSellVolumn? product.productSellVolumn : null,
      productStatus: product.productStatus? product.productStatus : null,
      productCategory: product.productCategory? product.productCategory : null,
      productDescription: product.productDescription? product.productDescription : null,
      productImage: product.productImage? product.productImage : null,
      _id: product._id.toString(),
      id: product.id? product.id : null
        }))
    return products
})

export default async function Products(){
    const initialProduct = await getProduct()
    return (
        <ProductPage initialProduct={initialProduct}></ProductPage>
    )
}