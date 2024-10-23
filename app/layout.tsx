import type { Metadata } from "next";
import "./globals.css";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
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
      <body className="bg-gradient-to-tr from-zinc-400 via-gray-600 to-zinc-400 w-full h-screen">
       
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
