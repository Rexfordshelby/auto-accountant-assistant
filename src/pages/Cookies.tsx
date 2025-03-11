
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Cookie, Shield, Settings, AlertCircle } from 'lucide-react';

const Cookies = () => {
  useEffect(() => {
    document.title = "Cookie Policy | Accountly";
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('visible');
        }
      });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-12 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center animate-on-scroll visible">
            <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
              Legal
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold mb-6">Cookie Policy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: April 20, 2023
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Accountly ("we," "our," or "us") uses cookies and similar technologies on our website. This Cookie Policy explains what cookies are, how we use them, your choices regarding cookies, and further information about cookies.
            </p>
            
            <h2>2. What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before. Cookies are a common technology used by virtually all websites.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
            
            <h2>3. How We Use Cookies</h2>
            <p>
              We use cookies for several purposes, including:
            </p>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies allow us to remember choices you make and provide enhanced, personalized features. For example, they may remember your login details or language preference.
              </li>
              <li>
                <strong>Performance and Analytics Cookies:</strong> These cookies collect information about how visitors use a website, for instance which pages visitors go to most often. We use this information to improve our website and provide a better user experience.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements that are more relevant to you and your interests. They also help limit the number of times you see an ad and measure the effectiveness of advertising campaigns.
              </li>
            </ul>
            
            <h2>4. Specific Cookies We Use</h2>
            <p>
              Here are examples of the cookies we use:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session_id</td>
                  <td>Maintains your session</td>
                  <td>Session</td>
                </tr>
                <tr>
                  <td>preferences</td>
                  <td>Stores your preferences</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics (measures website usage)</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_fbp</td>
                  <td>Facebook Pixel (tracks conversions)</td>
                  <td>3 months</td>
                </tr>
              </tbody>
            </table>
            
            <h2>5. Your Choices Regarding Cookies</h2>
            <p>
              If you prefer, you can choose to:
            </p>
            <ul>
              <li>Delete cookies after each browsing session</li>
              <li>Set your browser to prevent cookies from being stored on your device</li>
              <li>Use our cookie consent tool to manage your preferences</li>
            </ul>
            <p>
              Please note that if you choose to restrict cookies, you may find that some parts of our website do not work as expected.
            </p>
            
            <h2>6. How to Control and Delete Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. Here's how to find more information:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            
            <h2>7. Changes to Our Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p>
              Accountly, Inc.<br />
              123 Financial Street<br />
              Suite 400<br />
              New York, NY 10001<br />
              Email: privacy@accountly.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Have more questions?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our team is here to help you understand how we use cookies.
            </p>
            <Link to="/contact" className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors">
              Contact Our Privacy Team
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cookies;
