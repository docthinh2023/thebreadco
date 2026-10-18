import MaxWidthWrapper from "./components/maxwidthwrapper";
import {Agbalumo} from "next/font/google";
import {buttonVariants} from "./components/ui/button"
import Link from "next/link";
import {cn} from 'cn'
import {productPlaceHolders} from "./config/index"

const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        
       <section className="flex flex-col h-2/3 md:h-5/6 xl:h-9/10 justify-center mt-20 lg:mt-30 xl:mt-40">
        <div className="absolute object-fill w-full h-1/3 xl:h-4/5 overflow-hidden bg-black/35 -z-1">
        </div>
        <video autoPlay loop muted playsInline className="absolute object-fill self-center -z-2 h-1/3 xl:h-4/5 w-full overflow-hidden">
          <source src='https://x8iphmfczyw26zmo.public.blob.vercel-storage.com/HomeVideo.mp4'/>
        </video>
        <div className="py-2 flex flex-col justify-center-safe mb-10 lg:mb-20 xl:mb-60 text-center md:gap-8">
          <h1 className="text-3xl md:text-5xl xl:text-7xl text-bg-primary">The<span className={`${agbalumoRegular.className} text-4xl md:text-6xl xl:text-8xl`}>Bread</span>Co</h1>
          <p className="py-2 text-2xl md:text-4xl xl:text-6xl text-bg-secondary">From our oven to your heart.</p>
          <div className="py-2 flex flex-col md:flex-row flex-auto self-center gap-3 md:gap-11">
            <Link href='../Contacts' className={cn({buttonVariants}, 'bg-bg-primary hover:bg-red-700 transition duration-500 ease-in-out text-bg-secondary rounded-3xl md:text-2xl xl:text-3xl py-1.5 px-6 xl:py-2.5 xl:px-8 focus:outline-none focus:ring-2 focus:ring-offset-2')}>Visit Store</Link>
            <Link href='../Products' className={cn({buttonVariants}, 'bg-bg-primary hover:bg-red-700 transition duration-500 ease-in-out text-bg-secondary rounded-3xl md:text-2xl xl:text-3xl py-1.5 px-6 xl:py-2.5 xl:px-7 focus:outline-none focus:ring-2 focus:ring-offset-2')}>Shopping &rarr;</Link>
          </div>
        </div>
       </section>
       
       <section className="border-amber-500 bg-amber-100 py-2">
        <MaxWidthWrapper>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-7 justify-center content-center py-3 bg-amber-100">
             {productPlaceHolders.map((productPlaceHolder) => (
              <Link prefetch={false} href={`${productPlaceHolder.href}`} key={productPlaceHolder.Name} className="text-center justify-center align-middle transition duration-500 ease-in-out hover:text-red-600 grid">
                <div className="gap-2 justify-center flex flex-col">
                  <div className="flex self-center object-contain sm:h-auto sm:w-auto md:h-auto md:w-auto">
                    {productPlaceHolder.Image}
                  </div>
                  <div className={`${agbalumoRegular.className} text-3xs md:text-4xs xl:text-3xl self-center align-middle`}>
                  {productPlaceHolder.Name} &rarr;
                  </div>
                  <div className="text-center text-muted text-xs w-xs md:text-3xs xl:text-xl">
                  {productPlaceHolder.Description}
                  </div>
                </div>
              </Link>
             ))}
          </div>
        </MaxWidthWrapper>
       </section>
        
      </MaxWidthWrapper>
    </>
  );
}
