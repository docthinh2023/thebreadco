'use server'
import { SignupFormSchema,SignUpFormState } from '../lib/definitions'
import bcrypt from 'bcryptjs'
import {z} from 'zod';
import { createSession } from '../lib/session';
import clientPromise from '../../../lib/mongodb'
import {redirect} from 'next/navigation'
import { verifySession } from '../lib/verifysession';

export async function signup(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
 
  const validatedFields = SignupFormSchema.safeParse({
    userName: formData.get('userName'),
    userEmail: formData.get('userEmail'),
    userPassword: formData.get('userPassword'),
    userRole: formData.get('userRole')
  })
 

  if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }
 
  const { userRole ,userName, userEmail, userPassword } = validatedFields.data
  // e.g. Hash the user's password before storing it

  try{
   const session = await verifySession()
   const userId = session?.userId
   if(!userId){
    const hashedPassword = await bcrypt.hash(userPassword, 10)

   const client = await clientPromise;
   const db = client.db('thebreadco');

   const user = await db.collection('Users').findOne({ userEmail: userEmail });
   if(!user){
    const newUser = await db.collection('Users').insertOne({
    userRole: userRole,
    userName : userName,
    userEmail: userEmail,
    userPassword: hashedPassword,
    createAt: new Date()
   })
   
    await createSession(newUser.insertedId.toString() , userRole)
    return {status: 'success', message: 'User created! Welcome to TheBreadCo'}
   }else{return {status: 'error', message: 'User already exist!'}}
   }
   {return {status: 'error', message: 'Can not sign up while logged-in'}}
  }
  catch(error){
    return {status:'error', message: 'A server error occured.'}
  }

}

