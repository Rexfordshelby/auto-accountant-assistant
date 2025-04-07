
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Webinars = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Webinars</h1>
          <p className="text-gray-600 mb-8">
            Our webinar schedule is coming soon. Check back for upcoming educational events.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Webinars;
