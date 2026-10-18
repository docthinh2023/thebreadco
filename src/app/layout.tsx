import type { Metadata } from "next";
import { Momo_Trust_Display, Geist } from "next/font/google";
import {cn} from "cn" 
import Navbar from "./components/ui/navbar";
import Footer from "./components/ui/footer";
import "./globals.css";
import { Suspense } from "react";
import  ToastProvider  from  "../app/components/ui/toastcontainer";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const momoRegular = Momo_Trust_Display({
  weight: '400',
  style: 'normal',
});

export const metadata: Metadata = {
  title: "The Bread Co",
  description: "Bakery of your choice.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-dvh", "antialiased", momoRegular.className, "font-sans", geist.variable)}>
        <body className={cn(`h-full, ${momoRegular.className}, antialiased, pointer-events-auto bg-amber-100 flex flex-col`)}>
        <ToastProvider>
        <Navbar></Navbar>
        <main className="flex-1 h-dvh">{children}</main>
        <Suspense fallback={null}>
        </Suspense>
        <Footer></Footer>
        </ToastProvider>
        </body>
    </html>
  );
}
