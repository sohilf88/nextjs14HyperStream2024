import type { Metadata } from "next";
import "./globals.css";

import Providers from "./../reduxtoolkit/store/ClientProvider";
import { Toaster } from 'sonner';



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
      <body className="bg-slate-800">
       
        <Providers>
         
          {children}
          <Toaster 
          richColors
          closeButton
          visibleToasts={6}
          
          />
        </Providers>
        
      </body>
    </html>
  );
}
