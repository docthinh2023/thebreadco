import Link from 'next/link'
import GetUserInfo from '../client/info/page';
import { verifySession } from '../lib/verifysession';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import Sidebar from '../components/ui/sidebar';
import MaxWidthWrapper from '../components/maxwidthwrapper';


const Links = [
   {
    Name: 'Invoice'
   },
   {
    Name: 'Password'
   }
]

const AdminLinks = [
   {
    Name: 'Invoice'
   },
   {
    Name: 'Password'
   },
   {
    Name: 'AddProduct'
   },
   {
    Name: 'UpdateProduct'
   }
]

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

export default async function Profile() {
    const session = await verifySession()
    const role = session?.userRole === 'admin'
    const userList = await GetInfo()
    if(!userList){
        return <p>Could not load your info</p>
    }
    return (
       <MaxWidthWrapper>
         {!role? (<Sidebar initialLinks={Links}></Sidebar>) : (<Sidebar initialLinks={AdminLinks}></Sidebar>)}
         <main className="py-10 px-3 md:py-8 md:pl-0 md:mb-15 lg:mb-20 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen min-w-screen overflow-x-hidden">
            <div className='md:ml-35 flex flex-col min-w-screen self-center pb-3'>
              <div className='min-w-sm max-w-xl self-center md:mr-20 xl:mr-35'>
                <GetUserInfo initialList={userList}/>
               </div>
            </div>
         </main>
       </MaxWidthWrapper>
    )
}
