

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster";
import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import NavBarClient from "@/components/NavBarClient";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Summarize and chat with your documents",
  description: "Upload a PDF, get a summary, and chat with its content.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
 

  return (
    <html lang="en">
      <body className={inter.className}>
            {/* Mobile Menu
          <div className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-all duration-300 ease-in-out lg:hidden
            ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="pt-16 px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-lg font-medium text-gray-900 border-b border-gray-200 transition-colors hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div> */}
          {/* Regular NavBar (hidden on mobile) */}
          {/* <div className="hidden md:block">
            <NavBar />
          </div> */}
          <NavBarClient/>

        {children}
        <Toaster />

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://twitter.com/ValentinMabiala"
              className="text-blue-500 hover:underline"
            >
             okapi AI
            </a>
          </p>
        </footer>
      </body>
    </html>
  )
}

