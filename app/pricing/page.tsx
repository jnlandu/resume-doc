// pages/pricing.tsx

import Link from 'next/link';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      features: [
        "1 User",
        "Basic Support",
        "Access to Standard Features",
        "Monthly Reports"
      ],
      buttonLabel: "Get Started",
      buttonLink: "/signup/basic",
    },
    {
      name: "Pro",
      price: "$19.99",
      features: [
        "Up to 5 Users",
        "Priority Support",
        "Access to All Features",
        "Weekly Reports"
      ],
      buttonLabel: "Get Started",
      buttonLink: "/signup/pro",
    },
    {
      name: "Enterprise",
      price: "$49.99",
      features: [
        "Unlimited Users",
        "Dedicated Support",
        "Custom Features",
        "Daily Reports"
      ],
      buttonLabel: "Contact Us",
      buttonLink: "/contact",
    },
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback: "ResumDoc has transformed how I manage my documents. The summaries are concise and incredibly helpful!",
    },
    {
      name: "Jane Smith",
      feedback: "As a student, I find ResumDoc essential for summarizing my research papers quickly.",
    },
    {
      name: "Michael Lee",
      feedback: "The customer support is fantastic! They helped me get started in no time.",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      
      {/* Pricing Section */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Pricing Plans</h1>
      <p className="text-center text-lg text-gray-700 mb-12">
        Choose the plan that’s right for you. All plans come with a 14-day free trial.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{plan.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</p>
            <ul className="list-disc list-inside mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700">{feature}</li>
              ))}
            </ul>
            <Link href={plan.buttonLink}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                {plan.buttonLabel}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Testimonials Section */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-8">What Our Users Are Saying</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg">
              <p className="italic mb-4">"{testimonial.feedback}"</p>
              <p className="font-semibold">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Additional Features Section */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Additional Features</h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {[
            "Easy PDF Uploading",
            "Interactive Chat with Documents",
            "Comprehensive Reporting Tools",
            "Secure Document Storage",
            "Regular Updates and Improvements"
          ].map((feature, index) => (
            <div key={index} className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;