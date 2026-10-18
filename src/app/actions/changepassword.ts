'use server'
import { ChangePasswordFormState, PasswordSchema } from '../lib/definitions'
import {z} from 'zod';
import clientPromise from '../../../lib/mongodb'
import { verifySession } from '../lib/verifysession';
import { ObjectId } from 'mongodb';
import bcrypt, { hash } from 'bcryptjs';

export async function ChangeUserPassword(state: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> {
  
   const session = await verifySession()
   const userId = session?.userId

   if(userId){
    const validatedFields = PasswordSchema.safeParse({
    userPassword: formData.get('userPassword'),
    userNewPassword: formData.get('userNewPassword'),
    userConfirmedPassword: formData.get('userConfirmedPassword'),
  })
   

  if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
   
   const { userPassword, userNewPassword, userConfirmedPassword } = validatedFields.data


   try{
   if(userId){
      const client = await clientPromise;
   const db = client.db('thebreadco');
   if (typeof userId === 'string' && ObjectId.isValid(userId)) {
   const user = await db.collection('Users').findOne({_id: new ObjectId(userId)})

   if(!user)
    return {status: 'error', error: {userPassword: ['User is not authenticated.']}}

   const passwordMatch = await bcrypt.compare(userPassword, user.userPassword)
   if(!passwordMatch) return {status:'error', error: {userPassword: ['Current password does not match!']}}

   if(userPassword===userNewPassword) return {status:'error', error: {userNewPassword: ['New pass word is identital to current!']}}
   
   if(userNewPassword!==userConfirmedPassword){return {status: 'error', error: {userConfirmedPassword: ['Does not match with new password!']}}}
   const hashedPassword = await hash(userNewPassword, 10)
   await db.collection('Users').findOneAndUpdate({_id: new ObjectId(userId)},{
    $set: {userPassword: hashedPassword}
   })
   }
   return{status: 'success',
          message: 'Password have been changed!',}
   }else return{status: 'error', message:'You must be logged-in to change password.'}
   
   }catch(error){return {status: 'error', message:'Server error! unexpected server error.'}}
 
}}