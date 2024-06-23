import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giggle",
  description: "Giggle is a platform for meme sharing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
     <body className={`${inter.className} bg-black`}>
      <Providers>
       {children}
      </Providers>
     </body>
    </html>
  );
}
