'use server';
import {z} from 'zod'
import {NewsLetterFormState, NewsLetterSchema} from '../lib/definitions'
import clientPromise from '../../../lib/mongodb'
import {put} from '@vercel/blob'

export async function SubscribeNews(state:NewsLetterFormState, formData: FormData): Promise<NewsLetterFormState> {
  
  
  const validatedFields = NewsLetterSchema.safeParse({
     userName: formData.get('userName'),
     userEmail: formData.get('userEmail'),
     userPhone: formData.get('userPhone'),
     userMessage: formData.get('userMessage'),
  })
   if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
  
  const {userEmail, userPhone} = validatedFields.data

  try{

  const client = await clientPromise;
  const db = client.db('thebreadco');
   
    
    await db.collection('Users').updateOne(
    { userEmail: userEmail },
    {
    $set: {NewsLetter: 'true', userPhone: userPhone},      
    });

    return{ status: 'success', message: 'Success! You subscribed'}
  }
  
  catch(error){
    return{status: 'error', message: 'A server error occured. Please come back later.'}
  }

}
