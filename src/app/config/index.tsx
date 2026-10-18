import Image from 'next/image'
import Link from 'next/link'
import {Agbalumo} from "next/font/google"

const agbalumoRegular = Agbalumo({
    weight: '400',
    subsets: ["latin"],
});

export const productPlaceHolders = [
    {
      Name: 'Cookies',
      Image: <Image alt='Cookies' loading='eager' src='/ProductFeatures/Cookies.png' width={120} height={120}/>,
      href: '/Products/Cookies',
      Description: 'Chewy soft cookies thats full of delights.'
    },
    {
      Name: 'Cheesecakes',
      Image: <Image alt="Cheesecake" src='/ProductFeatures/Cheesecakes.png' width={120} height={120}/>,
      Link: <Link href='/Products/Cheesecake'></Link>,
      Description: 'Fluffy cheesecakes that will melt your heart. Baked or No-baked? We have it all.'
    },
    {
      Name: 'Breads',
      Image: <Image alt="Rustic Bread" src='/ProductFeatures/Breads.png' width={120} height={120}/>,
      href: '/Products/Bread',
      Description: 'Springy, hearty breads just the way you like it.'
    },
        {
      Name: 'Cakes',
      Image: <Image alt="Tiramisu" src='/ProductFeatures/Cakes.png' width={120} height={120}/>,
      href: '/Products/Cake',
      Description: 'Mouth-watering cakes, with many varieties to choose from.'
    },
    {
      Name: 'Tarts',
      Image: <Image alt="Tart" src='/ProductFeatures/Eggtart2.png' width={120} height={120}/>,
      href: '/Products/Tart',
      Description: 'Fruity and creamy tarts, perfect to lighten your day.'
    },

    {
      Name: 'Donuts',
      Image: <Image alt="Donut" src='/ProductFeatures/Donuts.png' width={120} height= {120}/>,
      href: '/Products/Donuts',
      Description: 'Soft and fluffy donuts. But beware! They are addictive!'
    }
]
