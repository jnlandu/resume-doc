import { Metadata } from "next"
import PDFUploader from "@/components/pdf-uploader"
import PDFViewer from "@/components/pdf-viewer"
import Summary from "@/components/summary"
import Chat from "@/components/chat"

export const metadata: Metadata = {
  title: "Summarize and chat with your documents",
  description: "Upload a PDF, get a summary, and chat with its content.",
}

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold  text-center w-30 mb-0">ResumDoc</h1>
      <p className="text-center text-lg text-gray-600 mt-0 mb-2">
        Upload a PDF, get a summary, and chat with its content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mb-4 p-9">
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

