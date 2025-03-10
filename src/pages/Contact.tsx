
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return { ...prev, services };
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        services: []
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  useEffect(() => {
    document.title = "Contact Us | Accountly";
    
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

  const services = [
    "Tax Services",
    "Accounting",
    "Financial Advisory",
    "Business Consulting",
    "Audit Services",
    "Compliance"
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 animate-on-scroll visible">
              <span className="inline-block text-sm font-medium bg-black/5 text-black/80 rounded-full px-3 py-1 mb-4">
                Contact Us
              </span>
              <h1 className="text-5xl font-semibold mb-6">Get in touch</h1>
              <p className="text-xl text-gray-600 mb-12">
                Have questions about our services? Our team is here to help you with all your accounting and financial needs.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Phone</h3>
                    <p className="text-gray-600 mb-1">Main Office: (555) 123-4567</p>
                    <p className="text-gray-600">Support: (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Email</h3>
                    <p className="text-gray-600 mb-1">General Inquiries: info@accountly.com</p>
                    <p className="text-gray-600">Support: support@accountly.com</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Office Location</h3>
                    <p className="text-gray-600 mb-1">123 Financial District</p>
                    <p className="text-gray-600">New York, NY 10004</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Business Hours</h3>
                    <p className="text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="glass-card p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Services You're Interested In</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {services.map(service => (
                        <div key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            id={service.toLowerCase().replace(/\s+/g, '-')}
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label 
                            htmlFor={service.toLowerCase().replace(/\s+/g, '-')}
                            className="ml-2 text-sm text-gray-700"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services and how we can help your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6 rounded-xl animate-on-scroll" style={{ transitionDelay: '100ms' }}>
              <h3 className="text-lg font-medium mb-2">How quickly do you respond to inquiries?</h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our support line.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <h3 className="text-lg font-medium mb-2">Do you offer virtual consultations?</h3>
              <p className="text-gray-600">
                Yes, we offer virtual consultations via Zoom or other video conferencing platforms for clients who prefer remote meetings.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-on-scroll" style={{ transitionDelay: '300ms' }}>
              <h3 className="text-lg font-medium mb-2">How do I schedule a consultation?</h3>
              <p className="text-gray-600">
                You can schedule a consultation by filling out the contact form, calling our office, or using our online scheduling system.
              </p>
            </div>
            
            <div className="glass-card p-6 rounded-xl animate-on-scroll" style={{ transitionDelay: '400ms' }}>
              <h3 className="text-lg font-medium mb-2">What information should I prepare for my first meeting?</h3>
              <p className="text-gray-600">
                For your first meeting, please prepare your financial statements, tax returns from previous years, and a list of questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer would go here */}
    </div>
  );
};

export default Contact;
