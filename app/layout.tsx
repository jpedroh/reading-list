import { Inter } from '@next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${inter.className} max-w-[1440px] mx-auto py-10 px-4 flex flex-col gap-6 bg-zinc-900 text-white`}>{children}</body>
    </html>
  )
}
