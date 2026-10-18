// app/actions.ts
'use server';
import {z} from 'zod'
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import {PostProductFormState, PostProductSchema} from '../lib/definitions'
import clientPromise from '../../../lib/mongodb'
import { verifySession } from '../lib/verifysession';


export async function productUpload(state:PostProductFormState, formData: FormData): Promise<PostProductFormState> {

  // handle input files  
  const validatedFields = PostProductSchema.safeParse({
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
       // handle image upload 
  const file = formData.get('image') as File;

  if (!file) {
    throw new Error('No file uploaded');
  }

  // Read file data into a Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Change the image name here
  const fileExtension = file.name.split('.').pop();
  const newFileName = `${productName}.${fileExtension}`;

  // Define the local storage path (e.g., inside public/uploads)
  const uploadDir = join(process.cwd(), 'public', 'ProductImages');
  const filePath = join(uploadDir, newFileName);

  const client = await clientPromise;
  const db = client.db('thebreadco');
   
    // Ensure the directory exists
   await mkdir(uploadDir, { recursive: true });
    // Save the file to the local directory
   await writeFile(filePath, buffer);

    const productImage = `/ProductImages/${newFileName}`

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
    $setOnInsert: {
    createAt: new Date()
    }
    },
    {upsert: true});
    return {status:"success", message: 'Success! A product was added'};
  }else {return {status:'error', message: 'You must log-in first.'}}
  }
  catch(error)
  {return {status:'error', message: 'A server error occured. Please come back later.'}};
}




