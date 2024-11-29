// pages/contact.tsx


'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending data to a backend
    try {
      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      // Reset form fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Contact Us</h1>
      <p className="text-center text-lg text-gray-700 mb-12">
        We would love to hear from you! Please fill out the form below.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required 
            rows={4}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <Button type="submit" className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>

      {success && (
        <div className="mt-4 text-center text-green-600">
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
};

export default Contact;