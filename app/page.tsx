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

      
      {/* About Section */}
      <section id="about" className="mt-10 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About Us</h2>
        <p className="text-gray-700">
          ResumDoc is a powerful tool designed to help you summarize and interact with your PDF documents effortlessly. Our mission is to provide users with an intuitive platform that simplifies document management and enhances productivity.
        </p>
        <p className="text-gray-700 mt-2">
          Whether you're a student looking to summarize research papers or a professional managing important documents, ResumDoc offers the features you need to work smarter.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-2">We would love to hear from you! If you have any questions or feedback, please reach out:</p>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: support@resumdoc.com</li>
          <li>Phone: (123) 456-7890</li>
          <li>Address: 123 Document Lane, Suite 100, Cityville, ST 12345</li>
        </ul>
      </section>
    </main>
  );
}