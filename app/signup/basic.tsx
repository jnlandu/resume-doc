// pages/signup/basic.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";

const BasicSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement signup logic here
    console.log("Signing up with:", { email, password });
    // After successful signup, redirect or show a success message
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Sign Up for Basic Plan</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
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
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="border rounded-md p-2 w-full"
          />
        </div>
        <Button type="submit" className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default BasicSignup;