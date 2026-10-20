'use server'
import { redirect } from 'next/navigation';
import clientPromise from '../../../lib/mongodb'
import { InvoiceFormState, InvoiceSchema } from '../lib/definitions';
import { verifySession } from '../lib/verifysession';
import {z} from 'zod'


export async function CreateInvoice(
  state: InvoiceFormState, 
  formData: FormData
): Promise<InvoiceFormState> {
  const items = formData.getAll('userItems')
  const id = formData.getAll('id');
  const titles = formData.getAll('title');
  const prices = formData.getAll('price');
  const quantities = formData.getAll('quantity');

  const submitedItems = items.map((item, index) => ({
    id: id[index],
    title: titles[index],
    price: Number(prices[index]),
    quantity: Number(quantities[index]),
  }));

  const validatedFields = InvoiceSchema.safeParse({
    totalAmount: Number(formData.get('totalAmount')),
    totalItems: Number(formData.get('totalItems')),
    userItems: submitedItems 
  });


  if (!validatedFields.success) {
    return {
     status: 'error',
     message: 'Validation error!',
     error: z.flattenError(validatedFields.error).fieldErrors,
    }
  }

  
  const session = await verifySession();
  const userId = session?.userId;

  if (!userId) {
    return { status: 'error', message: 'Unauthorized. Please log in.' };
  }

  const { userItems, totalAmount, totalItems } = validatedFields.data;
   
  try {
    const client = await clientPromise;
    const db = client.db('thebreadco');
    
   
    if (!totalItems || totalItems === 0) {
      return { status: 'error', message: 'You cannot check out with 0 items.' };
    }

  
    await db.collection('Invoice').insertOne({
      userId: userId,
      totalAmount: totalAmount,
      userItems: userItems,
      totalItems: totalItems,
      createdAt: new Date(),
      updatedAt: new Date(), 
    });

    return { status: 'success', message: 'Invoice created!' };
    
  } catch (error) {
    return { status: 'error', message: 'A server error occurred. Please come back later.' };
  }
}
