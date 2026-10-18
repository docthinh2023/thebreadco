'use server'
import { verifySession } from '../lib/verifysession';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import CheckoutPage from '../client/checkout/page'
import CheckOutPageSkeleton from '../client/checkoutpageskeleton/page'
import {Suspense} from 'react'


async function GetInfo() {
    const session = await verifySession()
    const userId = session?.userId
    if(userId){
        const client = await clientPromise
        const db = client.db('thebreadco')
        if (typeof userId === 'string' && ObjectId.isValid(userId)) {
        const user = await db.collection('Users').findOne({_id: new ObjectId(userId)})
        const userName = user?.userName
        const userinfo = await db.collection('UsersInfo').findOne({userId: userId}, {projection: {_id: 0, userId: 0, createdAt: 0, updatedAt: 0,}})
        return {
            userName: {userName: user?.userName? user.userName : ''},
            userCity: userinfo?.userCity? userinfo.userCity : '', 
            userAddress: userinfo?.userAddress? userinfo.userAddress : '', 
            userPostalCode: userinfo?.userPostalCode? userinfo.userPostalCode : '', 
        };
    }
}}


export default async function CheckOut () {

    const userInfo = await GetInfo()
    if(!userInfo)
    {return(
        <Suspense fallback={<div>loading....</div>}>
        <CheckOutPageSkeleton></CheckOutPageSkeleton>
        </Suspense>
    )}
    return (
              <Suspense fallback={<div>loading....</div>}>
              <CheckoutPage initialList={userInfo}></CheckoutPage>
              </Suspense>
    )
}