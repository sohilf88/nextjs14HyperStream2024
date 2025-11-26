import type { Metadata } from "next";
import "./globals.css";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Providers from "./../reduxtoolkit/store/ClientProvider";
import { Toaster } from 'sonner';
import Design from "@/components/Design";



export const metadata: Metadata = {
  title: "ArwaStreaming Services",
  description: "ArwaStreaming Services",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-loginImage bg-cover bg-no-repeat bg-center font-caveat">
       
        <Providers>
         
          {children}
          <Toaster 
          richColors
          closeButton
          visibleToasts={6}
          position="bottom-right"
          
          />
        </Providers>
        
      </body>
    </html>
  );
}

// import type { Metadata } from "next";
// import "./globals.css";
// import "ag-grid-community/styles/ag-grid.css";       // Core AG Grid CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // AG Grid Theme
// import Providers from "@/reduxtoolkit/store/ClientProvider";
// import { Toaster } from "sonner";

// // Optional: You imported Design, but didn’t use it — so I removed it.
// // If you plan to add a global design wrapper, we can keep it.

// export const metadata: Metadata = {
//   title: "HyperStream CCTV Live Streaming Services",
//   description: "HyperStream CCTV RTMP Service",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className="min-h-screen w-full bg-loginImage bg-cover bg-no-repeat bg-center text-gray-900 dark:text-gray-100">
//         <Providers>
//           {/* Main app content */}
//           <main className="relative z-10">{children}</main>

//           {/* Global toaster notifications */}
//           <Toaster
//             position="top-right"
//             richColors
//             closeButton
//             visibleToasts={6}
//           />
//         </Providers>
//       </body>
//     </html>
//   );
// }
