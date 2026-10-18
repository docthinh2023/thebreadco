'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "../../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel"
import MaxWidthWrapper from "../../components/maxwidthwrapper";
import {Agbalumo} from "next/font/google";
import Image from 'next/image'

const Images = [
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/About1.png' width={400} height={400}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/About2.png' width={400} height={400}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/About3.png' width={400} height={400}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/About4.png' width={400} height={400}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/About5.png' width={400} height={400}/>,
    },
]

const Partners = [
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner1.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner2.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner3.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner4.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner5.png' width={80} height={80}/>,
    },
        {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner6.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner7.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner8.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner9.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner10.png' width={80} height={80}/>,
    },
       {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner11.png' width={80} height={80}/>,
    },
    {
         Image: <Image alt='Cookies' loading='eager' src='/AboutImages/Partner12.png' width={80} height={80}/>,
    },
]




const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});

export default function AboutPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
  <MaxWidthWrapper>
   <div className="min-h-screen bg-amber-100 py-12 px-4 md:px-6 lg:px-8">
     <section className="my-20 md:my-30 mx-3 md:mx-8 flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row gap-8">
       <Carousel
      plugins={[plugin.current]}
      className="min-w-xs md:max-w-xs xl:min-w-2xl hover:shadow-2xl ease-in-out duration-500"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {image.Image}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    <section className="bg-amber-200 gap-2 xl:gap-3 border-6 border-amber-50 rounded-xl p-5 shadow-sm md:h-xl md:w-xs xl:w-2xl items-center flex flex-col hover:shadow-2xl ease-in-out duration-500 text-center">
    <h1 className={`${agbalumoRegular.className} text-xl md:text-3xl xl:text-4xl text-center xl:mt-10 flex`}>Taste</h1>
    <p className="className: text-muted text-sm md:text-xl xl:text-2xl w-full lg:w-full xl:w-xl flex">Taste is the most important factor of our product. The taste must always be right.</p>
    <h1 className={`${agbalumoRegular.className} text-xl md:text-3xl xl:text-4xl text-center flex`}>Texture</h1>
    <p className="className: text-muted text-sm md:text-xl xl:text-2xl w-full lg:w-full xl:w-xl flex self-center">Texture is the second important element we prefer. Every bite should be consistent.</p>
    <h1 className={`${agbalumoRegular.className} hidden xl:flex text-xl md:text-3xl xl:text-4xl text-center mt-10`}>Our partners</h1>
    <ul className="hidden xl:grid-cols-4 xl:grid self-center">{Partners.map((image, index) =>(
    <li key={index} className="self-center">{image.Image}</li>
    ))}</ul>
    </section>
    </div>
    <section className="xl:hidden flex flex-col justify-center items-center h-40 w-full bg-amber-200 mt-5 border-6 border-amber-50 rounded-xl p-5 shadow-sm justify-items-center hover:shadow-2xl ease-in-out duration-500">
    <h1>Our partners</h1>
    <ul className="flex self-center">{Partners.map((image, index) =>(
    <li key={index} className="self-center">{image.Image}</li>
    ))}</ul>
    </section>
  </section>
  </div>
  </MaxWidthWrapper>
  )
}
