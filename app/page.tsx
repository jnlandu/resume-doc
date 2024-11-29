import { Metadata } from "next";
import PDFUploader from "@/components/pdf-uploader";
import PDFViewer from "@/components/pdf-viewer";
import Summary from "@/components/summary";
import Chat from "@/components/chat";

export const metadata: Metadata = {
  title: "Summarize and chat with your documents",
  description: "Upload a PDF, get a summary, and chat with its content.",
};

export default function Home() {
  return (
    <main className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        ResumDoc
      </h1>
      <p className="text-center text-lg text-gray-700 mb-6">
        Upload a PDF, get a summary, and chat with its content.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <PDFUploader />
          <PDFViewer />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <Summary />
          <Chat />
        </div>
      </div>
    </main>
  );
}