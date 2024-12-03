'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Loader2, 
  Smartphone, 
  DollarSign, 
  CreditCard as StripeIcon 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileProvider, setMobileProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Payment method detection and processing
  const detectCardType = (number: any) => {
    const visa = /^4/;
    const mastercard = /^5[1-5]/;
    const amex = /^3[47]/;

    if (visa.test(number)) return "visa";
    if (mastercard.test(number)) return "mastercard";
    if (amex.test(number)) return "amex";
    return "";
  };

  const handleCardNumberChange = (e: any) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formattedValue);
    setCardType(detectCardType(value));
  };

  const handleExpirationChange = (e: any) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpirationDate(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulated payment processing with method-specific validation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      switch(paymentMethod) {
        case "creditCard":
          if (!cardNumber || !expirationDate || !cvv) {
            throw new Error("Please complete all credit card details");
          }
          break;
        case "mobileMoney":
          if (!mobileNumber || !mobileProvider) {
            throw new Error("Please provide mobile money details");
          }
          break;
        case "stripe":
          // Additional Stripe-specific validation could be added here
          break;
      }

      setSuccess(true);
      // Reset all fields
      setCardNumber("");
      setExpirationDate("");
      setCvv("");
      setCardType("");
      setMobileNumber("");
      setMobileProvider("");
    } catch (error: any) {
      console.error("Payment failed:", error);
      setError(error.message || "Payment processing failed. Please try again.");
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
            <h2 className="text-3xl font-bold mb-6">Flexible Payments</h2>
            <p className="text-lg mb-8">Multiple secure payment methods to suit your convenience.</p>
            
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Options</h1>
          
          <Tabs 
            value={paymentMethod} 
            onValueChange={setPaymentMethod} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="creditCard" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </TabsTrigger>
              <TabsTrigger value="mobileMoney" className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </TabsTrigger>
              <TabsTrigger value="stripe" className="flex items-center space-x-2">
                <StripeIcon className="w-4 h-4" />
                <span>Stripe</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TabsContent value="creditCard">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
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
                        maxLength={5}
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
                        maxLength={3}
                        required 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobileMoney">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Mobile Number</label>
                    <Input 
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter mobile number"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mobile Provider</label>
                    <Select 
                      value={mobileProvider}
                      onValueChange={setMobileProvider}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Mobile Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orange">Orange Money</SelectItem>
                        <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                        <SelectItem value="airtel">Airtel Money</SelectItem>
                        <SelectItem value="mobile">Other Mobile Providers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stripe">
                <div className="space-y-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-700">
                      <StripeIcon className="mx-auto mb-4 w-12 h-12 text-blue-500" />
                      Secure payment via Stripe
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      You'll be redirected to Stripe's secure payment gateway
                    </p>
                  </div>
                </div>
              </TabsContent>

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
          </Tabs>

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