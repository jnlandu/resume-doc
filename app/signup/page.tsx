// pages/signup/index.tsx

import Link from 'next/link';

const Signup = () => {
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
      link: "/signup/basic",
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
      link: "/signup/pro",
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
      link: "/signup/enterprise",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Choose Your Plan</h1>
      <p className="text-center text-lg text-gray-700 mb-12">
        Sign up for one of our plans and start enjoying the benefits of ResumDoc.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:-translate-y-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{plan.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</p>
            <ul className="list-disc list-inside mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700">{feature}</li>
              ))}
            </ul>
            <Link href={plan.link}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signup;