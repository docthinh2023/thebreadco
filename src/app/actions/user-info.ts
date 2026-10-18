'use server'
import { UserInfoFormState, UserInfoSchema } from '../lib/definitions'
import {z} from 'zod';
import clientPromise from '../../../lib/mongodb'
import { verifySession } from '../lib/verifysession';
import { ObjectId } from 'mongodb';

export async function userInfo(state: UserInfoFormState, formData: FormData): Promise<UserInfoFormState> {
 
  const validatedFields = UserInfoSchema.safeParse({
    userName: formData.get('userName'),
    userAddress: formData.get('userAddress'),
    userCity: formData.get('userCity'),
    userPostalCode: formData.get('userPostalCode')
  })
 
 
  if (!validatedFields.success) {
    return {
     status:'error',
     message: 'Validation error.',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
  
   const session = await verifySession()
   const userId = session?.userId

   
   const { userName, userAddress, userCity, userPostalCode } = validatedFields.data
   
   try{
   if(userId){
   const client = await clientPromise;
   const db = client.db('thebreadco');
   if (typeof userId === 'string' && ObjectId.isValid(userId)) {
   if(userName){
     await db.collection('Users').findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {$set: {
      userName: userName,  
    }, $setOnInsert: {
      
    }},
    {upsert:true});
  } 
    await db.collection('UsersInfo').findOneAndUpdate(
    { userId: userId },
    {$set: {
        userAddress: userAddress,
        userCity: userCity,
        userPostalCode: userPostalCode,
        updateAt: new Date()
    },$setOnInsert: {
        createAt: new Date()
    }}, {upsert:true} )
   }
  return{ status: 'success', message: 'Success! User info updated!'}
}else {return {status: 'error', message: 'Error!You must logged in first.'}}
   }
   catch(error){
    return {status: 'error', message: 'A server error occured. Please come back later.'}
   }
  
}