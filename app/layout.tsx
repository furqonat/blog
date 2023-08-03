import { Navbar } from '@iofel/prebuilt'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ReactNode } from 'react'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Romdhani',
  description: 'A personal blog',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${openSans.className} flex flex-col gap-10`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
