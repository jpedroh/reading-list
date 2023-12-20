import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
  add,
}: {
  children: React.ReactNode;
  add: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body
        className={
          "max-w-[1440px] mx-auto py-10 px-4 flex flex-col gap-6 bg-zinc-900 text-white"
        }
      >
        {children}
        {add}
      </body>
    </html>
  );
}
