'use server'
import { LoginFormSchema, LoginFormState } from '../lib/definitions'
import bcrypt from 'bcryptjs'
import {  z } from 'zod';
import { createSession } from '../lib/session';
import clientPromise from '../../../lib/mongodb'
import { redirect } from 'next/navigation';
import { verifySession } from '../lib/verifysession';

export async function login(state: LoginFormState, formData: FormData):Promise<LoginFormState> {

  const validatedFields = LoginFormSchema.safeParse({
    userEmail: formData.get('userEmail'),
    userPassword: formData.get('userPassword'),
  })

  if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  const { userEmail, userPassword } = validatedFields.data
  
  try{
    const session = await verifySession()
    const userId = session?.userId 
    if(!userId){
    const client = await clientPromise;
    const db = client.db('thebreadco');
    const user = await db.collection('Users').findOne({ userEmail: userEmail });
    if(!user)
    return {status:'error', error: {userEmail: ["No user exist with this email"]}}
    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
    if(!isPasswordValid)
    return { status:'error', error: {userPassword: ["Password is incorrect!"]}, }

    
    await createSession(user._id.toString(), user.userRole)
    return {status: 'success', message: 'Signed-in!'}
  
    }else{return {status:'error', message: 'You are already signed-in'}}
   
  } 
  catch(error){
    return{status:'error', message: 'A server error occured. Please come back later.'}
  }


  



  
}

