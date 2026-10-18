import ChangePassword from '../../components/ui/changepassword-info';
import Sidebar from '../../components/ui/sidebar';
import MaxWidthWrapper from '../../components/maxwidthwrapper';
import { verifySession } from '@/app/lib/verifysession';
import clientPromise from '../../../../lib/mongodb'
import InvoicePage from '../../client/invoice/page'
import UpdateProductForm from '../../components/ui/update-productform'
import PostProductForm from '../../components/ui/post-productform';


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


async function getNameList() {
   const client = await clientPromise
   const db = client.db('thebreadco')

   const products = await db.collection('Products').find({}).toArray()
   const list = products.map((product) =>({
    ...product,
    productName: product.productName,
    productCategory: product.productCategory,
    _id: product._id.toString()
}))
   return list
}


async function getInvoice() {
    const session = await verifySession()
    const userId = session?.userId
    const client = await clientPromise
    const db = client.db('thebreadco')


    const result = await db.collection('Invoice').find({ userId : userId }, {projection: {userId: 0, _id: 0, updatedAt: 0}}).toArray()
    const Invoice = result.map((invoice) => ({
      ...invoice,
      userItems: invoice.userItems? invoice.userItems : null,
      totalAmount: invoice.totalAmount? invoice.totalAmount : null,
      totalItems: invoice.totalItems? invoice.totalItems : null,
      createdAt: invoice.createdAt? invoice.createdAt.toISOString() : null,
        }))
    return Invoice
}


export default async function ProfileActions({params,} : {params: Promise<{slug: string}>;}) {
  const session = await verifySession()
  const role = session?.userRole === 'admin'
  const { slug } = await params
  const initialInvoice = await getInvoice()
  const List = await getNameList()

    return (
       <MaxWidthWrapper>
         {!role? (<Sidebar initialLinks={Links}></Sidebar>) : (<Sidebar initialLinks={AdminLinks}></Sidebar>)}
         {slug === 'Password' &&
         <main className="py-10 px-3 md:py-8 md:pl-0 md:pr-3 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen min-w-screen overflow-x-hidden">
          <div className='md:ml-35 flex flex-col min-w-screen self-center pb-3'>
            <div className='min-w-xs max-w-xl self-center md:mr-20 xl:mr-35'>
            <label className='text-xl mb-2 flex justify-center items-center text-fg-primary'>Change Password</label>
            <ChangePassword></ChangePassword>
            </div>
          </div>
         </main>
         }
         {slug === 'Invoice' &&
         <InvoicePage initialInvoice={initialInvoice}></InvoicePage>
         }
         {slug === 'UpdateProduct' &&
          <main className="py-10 px-3 md:py-8 md:pl-0 md:mb-15 lg:mb-20 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen min-w-screen overflow-x-hidden">
            <div className='md:ml-35 flex flex-col min-w-screen self-center pb-3'>
              <div className='min-w-sm max-w-xl self-center md:mr-20 xl:mr-35'>
                <label className='text-xl mb-2 flex justify-center items-center text-fg-primary'>Update Product</label>
                <UpdateProductForm productNameList={List}></UpdateProductForm>
               </div>
            </div>
         </main>
         }
         {slug === 'AddProduct' &&
            <main className="py-10 px-3 md:py-8 md:pl-0 md:mb-15 lg:mb-20 xl:py-15 gap-3 flex flex-col md:flex-row min-h-screen min-w-screen overflow-x-hidden">
            <div className='md:ml-35 flex flex-col min-w-screen self-center pb-3'>
              <div className='min-w-sm max-w-xl self-center md:mr-20 xl:mr-35'>
                <label className='text-xl mb-2 flex justify-center items-center text-fg-primary'>Add Product</label>
                <PostProductForm></PostProductForm>
               </div>
            </div>
         </main>
         }
       </MaxWidthWrapper>
    )
}
