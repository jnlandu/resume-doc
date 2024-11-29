'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Lock, ShieldCheck, Loader2 } from "lucide-react";

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Card type detection
  const detectCardType = (number) => {
    const visa = /^4/;
    const mastercard = /^5[1-5]/;
    const amex = /^3[47]/;

    if (visa.test(number)) return "visa";
    if (mastercard.test(number)) return "mastercard";
    if (amex.test(number)) return "amex";
    return "";
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
    setCardType(detectCardType(value));
  };

  const handleExpirationChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpirationDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
      setCardType("");
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        {/* Left Illustration Section */}
        <div className="w-1/2 bg-blue-600 text-white p-12 flex flex-col justify-center relative">
          <img 
            src="https://cdn.jsdelivr.net/gh/dev-family/illustrations/payments-secure.svg" 
            alt="Payment Security" 
            className="absolute top-0 left-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Secure Payment</h2>
            <p className="text-lg mb-8">Your transaction is protected with state-of-the-art encryption technology.</p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <ShieldCheck className="w-10 h-10 text-green-400" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center space-x-4">
                <Lock className="w-10 h-10 text-green-400" />
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Payment Form Section */}
        <div className="w-1/2 p-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Details</h1>
          <p className="text-gray-600 mb-8">Complete your transaction securely</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              {cardType && (
                <div className="mt-2 text-sm text-gray-600">
                  Detected Card: {cardType.toUpperCase()}
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <div className="w-2/3">
                <label className="block text-gray-700 mb-2">Expiration Date</label>
                <input 
                  type="text" 
                  value={expirationDate}
                  onChange={handleExpirationChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-gray-700 mb-2">CVV</label>
                <input 
                  type="text" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength="3"
                  required 
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Pay Now"
              )}
            </Button>
          </form>

          {success && (
            <div className="mt-6 bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-center">
              Payment Successful! Thank you for your transaction.
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;