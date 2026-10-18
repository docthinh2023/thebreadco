import clientPromise from '../../../../lib/mongodb'
import ProductPage from '../../client/product/page';
import Link from 'next/link'
import {AiOutlineArrowLeft} from 'react-icons/ai'





async function getCategory (category: string) {

    const client = await clientPromise
    const db = client.db('thebreadco')


    const result = await db.collection('Products').find({productCategory: category}).toArray()
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
}

export default async function Category({params,}:{params: Promise<{category: string}>}){
    const {category} = await params
    const Products = await getCategory(category)
    return (
        <ProductPage initialProduct={Products}></ProductPage>
    )
}