import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "./../reduxtoolkit/store/ClientProvider";
import NextAuthSessionProvider from "@/components/NextAuthSessionProvider";



export const metadata: Metadata = {
  title: "HyperStream CCTV Live Streaming Services",
  description: "HyperStream CCTV RTMP Service",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-700">
        <NextAuthSessionProvider>
        <Providers>
         
          {children}
        </Providers>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
