import { verifySession } from '@/app/lib/verifysession';
import clientPromise from '../../../../lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { success } from 'zod';
import { error } from 'next/dist/build/output/log';


    const client = await clientPromise
    const db = client.db('thebreadco')


export async function POST(request: NextRequest){
   const session = await verifySession()
   const userId = session?.userId
  if(!userId)
  {return NextResponse.json({success:false , message: 'Access denied! you must log-in to create invoice'})}else     
   {try {
        const body = await request.json();
        const {totalAmount, userItems, totalItems} = body;
        
        if(!totalItems){
          return NextResponse.json({error: 'Cant check out with 0 item', code: 'ERROR'})
        }else
        {const result = await db.collection('Invoice').insertOne({
        userId: userId,
        totalAmount: totalAmount,
        userItems: userItems,
        totalItems: totalItems,
        createdAt: new Date(),
        updatedAt: new Date(), 
        })
       return NextResponse.json(result)
      }
    }
    catch(error) {
    console.error('Database error: can not create user invoice');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
    }}
}

export async function GET(request:NextRequest){
   const session = await verifySession()
    const userId = session?.userId
  if(!userId){return NextResponse.json({success: false, message: 'You must sign-in to see your invoices'})}

  try {


    const result = await db.collection('Invoice').find({ userId : userId }, {projection: {userId: 0, _id: 0,},}).sort({createdAt: -1}).limit(10).toArray()
    const Invoice = result.map((invoice) => ({
      ...invoice,
      userItems: invoice.userItems? invoice.userItems : null,
      totalAmount: invoice.totalAmount? invoice.totalAmount : null,
      createdAt: invoice.createdAt? invoice.createdAt.toISOString() : null,
        }))
    
    return NextResponse.json(Invoice)
  }
  catch {
    console.error('Database error: can not fetch user invoice')
    return NextResponse.json(
      {
        error: 'Internal Server Error'
      },
      {status:500}
    )
  }
}