'use server';
import {z} from 'zod'
import {UpdateProductFormState, UpdateProductSchema} from '../lib/definitions'
import clientPromise from '../../../lib/mongodb'
import { verifySession } from '../lib/verifysession';
import {put} from '@vercel/blob'

export async function productUpdate(state:UpdateProductFormState, formData: FormData): Promise<UpdateProductFormState> {
  
  
  const validatedFields = UpdateProductSchema.safeParse({
     productName: formData.get('productName'),
     productCategory: formData.get('productCategory'),
     productStatus: formData.get('productStatus'),
     productPrice: formData.get('productPrice'),
     productSellVolumn: formData.get('productSellVolumn'),
     productDescription: formData.get('productDescription')
  })
   if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
  
  const {productName, productCategory, productPrice, productSellVolumn, productDescription, productStatus} = validatedFields.data

  try{

  const session = await verifySession()
  const userId = session?.userId

  if(userId){
      
  const file = formData.get('image') as File;

  if (!file) {
    throw new Error('No file uploaded');
  }


  
  const fileExtension = file.name.split('.').pop();
  const newFileName = `${productName}.${fileExtension}`;

  const blob = await put(newFileName, file, {access: 'public', allowOverwrite: true})
  const productImage = blob.url

  const client = await clientPromise;
  const db = client.db('thebreadco');
   
  

    
    await db.collection('Products').updateOne(
    { productName: productName },
    {
    $set: {productPrice: productPrice,
    productStatus: productStatus,
    productDescription: productDescription,
    productCategory: productCategory,
    productImage: productImage,
    productSellVolumn: productSellVolumn,
    updatedAt: new Date()},      
    });

    return{ status: 'success', message: 'Success! Product updated'}
  }else return{status: 'error', message: 'You must logged-in first'}
  
  }
  catch(error){
    return{status: 'error', message: 'A server error occured. Please come back later.'}
  }

}

