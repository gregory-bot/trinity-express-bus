import React from 'react';
import { Shield, Clock, MapPin, Truck } from 'lucide-react';

const MoreSection = () => {
  return (
    <section id="more" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">why Choose Trinity Express?</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-300 p-6 rounded-lg shadow-md">
            <Shield className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-semibold mb-2">safety first</h3>
            <p className="text-gray-600">
              regular vehicle maintenance and professional drivers ensure your safety.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-md">
            <Clock className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-semibold mb-2">Punctual Service</h3>
            <p className="text-gray-600">
              reliable schedules and real-time updates for your convenience.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-md">
            <MapPin className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-semibold mb-2">wide coverage</h3>
            <p className="text-gray-600">
              extensive route network covering all major areas in East Africa.
            </p>
          </div>
          
          <div className="bg-blue-300 p-6 rounded-lg shadow-md">
            <Truck className="w-12 h-12 text-[#8B0000] mb-4" />
            <h3 className="text-xl font-semibold mb-2">modern fleet</h3>
            <p className="text-gray-600">
              comfortable, well-maintained buses for a pleasant journey.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-blue-300 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-6">frequently asked questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">how do I book a ticket?</h4>
              <p className="text-gray-600">simply use our online booking system, select your route, choose your preferred time, and complete the payment.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">what payment methods do you accept?</h4>
              <p className="text-gray-600">we accept M-Pesa, credit/debit cards, and other major payment methods.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">can I cancel my booking?</h4>
              <p className="text-gray-600">yes, bookings can be cancelled up to 2 hours before departure for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreSection;