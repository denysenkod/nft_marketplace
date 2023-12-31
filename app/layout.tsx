import {Nunito} from "next/font/google";

import './globals.css';

import Marketplace from "./components/marketplace/Marketplace";
import NFTpage from "./components/marketplace/NFTpage";
import NFTplate from "./components/marketplace/NFTplate";
import ListNFTModal from "./components/listNFT/ListNFTModal";

import type { Metadata } from 'next';
import ToasterProvider from "./providers/ToasterProvider";

export const metadata: Metadata = {
  title: 'NFT markeplace',
  description: 'NFT markeplace',
}

const font = Nunito({
  subsets: ["latin"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={font.className}>
            {children}
        </body>
    </html>
  )
}
