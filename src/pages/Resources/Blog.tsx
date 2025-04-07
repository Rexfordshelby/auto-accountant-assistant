
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 mt-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Blog</h1>
          <p className="text-gray-600 mb-8">
            Our blog content is coming soon. Check back for accounting insights and tips.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
