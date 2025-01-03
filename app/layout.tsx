import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Summarize and chat with your documents",
  description: "Upload a PDF, get a summary, and chat with its content.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

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

