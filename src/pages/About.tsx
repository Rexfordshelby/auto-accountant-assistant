
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">About Us</h1>
          <p className="text-gray-600 mb-8">
            Our about page is under construction. Learn more about our company soon.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
