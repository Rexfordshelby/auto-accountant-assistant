
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Financial Insights</h1>
          <p className="text-gray-600 mb-8">
            Our financial insights section is under construction. Check back for expert analysis.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Insights;
