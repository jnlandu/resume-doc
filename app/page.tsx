import Link from 'next/link';
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
      {/* Menu Bar */}
      <nav className="bg-white shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center p-4">
          <div className="text-lg font-bold text-blue-600">
            <Link href="/">
            ResumDoc
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Sign In
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        ResumDoc
      </h1>
      <p className="text-center text-lg text-gray-700 mb-6">
        Upload a PDF, get a summary, and chat with its content.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div id="uploader" className="bg-white shadow-lg rounded-lg p-6 mb-4">
          <PDFUploader />
          <PDFViewer />
        </div>
        <div id="summary" className="bg-white shadow-lg rounded-lg p-6 space-y-8">
          <Summary />
          <Chat />
        </div>
      </div>

      
      <section
  id="about"
  className="mt-12 bg-white shadow-md rounded-xl p-10 lg:px-16 lg:py-12 max-w-5xl mx-auto"
>
  <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-4 pb-3 border-blue-500">
    About Us
  </h2>
  <p className="text-lg text-gray-700 leading-relaxed mb-4">
    <strong className="text-gray-900">ResumDoc</strong> is a cutting-edge tool designed to help
    you seamlessly summarize and interact with your PDF documents. Our goal is to provide an
    intuitive, powerful platform that simplifies document workflows and boosts productivity.
  </p>
  <p className="text-lg text-gray-700 leading-relaxed">
    Whether you're a student summarizing research papers or a professional organizing critical
    documents, <strong className="text-gray-900">ResumDoc</strong> delivers the tools you need to
    work smarter, not harder.
  </p>
</section>

{/* Contact Section */}
<section
  id="contact"
  className="mt-16 bg-gray-50 shadow-md rounded-xl p-10 lg:px-16 lg:py-12 max-w-5xl mx-auto"
>
  <h2 className="text-3xl font-extrabold mb-6 text-gray-900 border-b-4 pb-3 border-blue-500">
    Contact Us
  </h2>
  <p className="text-lg text-gray-700 leading-relaxed mb-6">
    We'd love to hear from you! Have questions, suggestions, or feedback? Get in touch with us
    via the following channels:
  </p>
  <ul className="space-y-4 text-lg">
    <li>
      <strong className="text-gray-900">Email:</strong>{' '}
      <a
        href="mailto:support@resumdoc.com"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        support@resumdoc.com
      </a>
    </li>
    <li>
      <strong className="text-gray-900">Phone:</strong>{' '}
      <span>(123) 456-7890</span>
    </li>
    <li>
      <strong className="text-gray-900">Address:</strong>{' '}
      <span>123 Document Lane, Suite 100, Cityville, ST 12345</span>
    </li>
  </ul>
  <div className="mt-8">
    <a
      href="mailto:support@resumdoc.com"
      className="inline-block bg-blue-600 text-white text-lg font-medium py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
    >
      Get in Touch
    </a>
  </div>
</section>


    </main>
  );
}