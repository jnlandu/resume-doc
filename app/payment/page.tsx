// pages/payment.tsx

'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    // Simulate payment processing
    try {
      // Replace this with actual API call to process payment
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      // Reset form fields
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Payment Information</h1>
      <p className="text-center text-lg text-gray-700 mb-12">
        Please enter your payment details below to complete your purchase.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input 
            type="text" 
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiration Date (MM/YY)</label>
          <input 
            type="text" 
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input 
            type="text" 
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <Button type="submit" className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </form>

      {success && (
        <div className="mt-4 text-center text-green-600">
          Your payment has been processed successfully!
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default Payment;