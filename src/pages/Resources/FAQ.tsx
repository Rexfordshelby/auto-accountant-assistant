
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">
            Our FAQ section is under construction. We'll be adding answers to common questions soon.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
