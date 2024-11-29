// pages/signin.tsx

'use client';
import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Mock authentication logic (replace with real API call)
    if (email === 'user@example.com' && password === 'password') {
      setSuccess(true);
      console.log('Sign in successful');
      // Redirect or perform further actions here
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Sign in successful!</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-gray-600">
        Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-700">Sign Up</a>
      </p>

    </div>
  );
};

export default SignIn;