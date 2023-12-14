import {Nunito} from "next/font/google";

import type { Metadata } from 'next';



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