import { Metadata } from "next"
import PDFUploader from "@/components/pdf-uploader"
import PDFViewer from "@/components/pdf-viewer"
import Summary from "@/components/summary"
import Chat from "@/components/chat"

export const metadata: Metadata = {
  title: "PDF Summarizer and Chat",
  description: "Upload a PDF, get a summary, and chat with its content.",
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">PDF Summarizer and Chat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <PDFUploader />
          <PDFViewer />
        </div>
        <div className="space-y-8">
          <Summary />
          <Chat />
        </div>
      </div>
    </main>
  )
}

