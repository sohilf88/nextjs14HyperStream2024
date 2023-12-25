import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./../reduxtoolkit/store/ClientProvider";
import Header from "./../components/Header";

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
      <body>
        <Providers>
          <Header></Header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
