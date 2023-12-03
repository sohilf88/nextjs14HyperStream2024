import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from './../reduxtoolkit/store/ClientProvider';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HyperStream CCTV RTMP Service",
  description: "HyperStream CCTV RTMP Service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
