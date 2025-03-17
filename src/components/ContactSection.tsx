import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">contact us</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {}
          <div className="bg-white rounded-lg shadow-md p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B0000] focus:border-[#8B0000]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B0000] focus:border-[#8B0000]"
                  placeholder="kipngenogregory@gmail.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  message/complaint
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#8B0000] focus:border-[#8B0000]"
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#8B0000] text-white py-2 px-4 rounded-md hover:bg-[#A52A2A] transition-colors"
              >
                send message
              </button>
            </form>
          </div>
          {}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">get in touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-[#8B0000]" />
                  <span>+254 756385724</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-[#8B0000]" />
                  <span>info@trinityexpress@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[#8B0000]" />
                  <span>
                  Duruma Road,Moi, Nairobi Area, Kenya 00100</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">follow us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#8B0000] hover:text-[#A52A2A]">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-[#8B0000] hover:text-[#A52A2A]">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-[#8B0000] hover:text-[#A52A2A]">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;