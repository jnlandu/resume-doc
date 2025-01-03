import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import NavBar from '@/components/NavBar';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$4.99",
      features: [
        "1 User",
        "Basic Support",
        "Access to Standard Features",
        "Monthly Reports"
      ],
      buttonLabel: "Get Started",
      buttonLink: "/signup/basic",
      highlight: false
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "Up to 5 Users",
        "Priority Support",
        "Access to All Features",
        "Weekly Reports"
      ],
      buttonLabel: "Get Started",
      buttonLink: "/signup/pro",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$19.99",
      features: [
        "Unlimited Users",
        "Dedicated Support",
        "Custom Features",
        "Daily Reports"
      ],
      buttonLabel: "Contact Us",
      buttonLink: "/contact",
      highlight: false
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, TechCorp",
      feedback: "ResumDoc has transformed how I manage my documents. The summaries are concise and incredibly helpful!",
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Jane Smith",
      role: "Student Researcher",
      feedback: "As a student, I find ResumDoc essential for summarizing my research papers quickly.",
      avatar: "https://via.placeholder.com/150"
    },
    {
      name: "Michael Lee",
      role: "Project Manager",
      feedback: "The customer support is fantastic! They helped me get started in no time.",
      avatar: "https://via.placeholder.com/150"
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Navbar */}
        <NavBar/>
      {/* Rest of the pricing page content remains the same as in the previous artifact */}
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your document management needs. 
          No hidden fees, no long-term commitments. Start with a 14-day free trial.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg p-6 transform transition-all 
                ${plan.highlight ? 'scale-105 border-2 border-blue-500' : 'hover:shadow-xl'}
              `}
            >
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{plan.name}</h2>
                <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price} 
                  <span className="text-sm text-gray-500 ml-2">/month</span>
                </p>
                
                <ul className="space-y-4 mb-8 text-gray-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={plan.buttonLink}>
                  <Button 
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full ${
                      plan.highlight 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {plan.buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-6 text-center"
              >
                <p className="italic text-gray-600 mb-4">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center justify-center mt-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">
          All Plans Include
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            "Easy PDF Uploading",
            "Interactive Document Chat",
            "Secure Cloud Storage",
            "Regular Feature Updates",
            "Cross-Platform Compatibility",
            "24/7 Customer Support"
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Document Workflow?
          </h2>
          <p className="text-xl mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 ResumDoc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;