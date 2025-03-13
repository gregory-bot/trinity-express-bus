import React, { useState } from 'react';
import { MapPin, Calendar, Clock, X } from 'lucide-react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ price?: string; duration?: string } | null>(null);

  const locations = [
    "NAIROBI",
    "KIGALI",
    "KAMPALA",
    "JUBA"
  ];

  const routePrices = {
    "NAIROBI-KIGALI": { price: "KSh 7000", duration: "12 hours" },
    "NAIROBI-KAMPALA": { price: "KSh 4000", duration: "10 hours" },
    "NAIROBI-JUBA": { price: "KSh 9000", duration: "15 hours" },
    "KIGALI-NAIROBI": { price: "60000 FRW/ KSH 7,200", duration: "12 hours" },
    "KIGALI-KAMPALA": { price: "25000 FRW/ KSH 3,000", duration: "8 hours" },
    "KAMPALA-NAIROBI": { price: "100000 UGX/ KSH 3,800 ", duration: "10 hours" },
    "KAMPALA-JUBA": { price: "130000 UGX/ KSH 4,940 ", duration: "14 hours" },
    "KAMPALA-KIGALI": { price: "100000 UGX/ KSH 3,800", duration: "8 hours" }
  };

  const handleDestinationChange = (destination: string) => {
    setFormData(prev => ({ ...prev, to: destination }));
    const routeKey = `${formData.from}-${destination}`;
    if (routeKey in routePrices) {
      setRouteInfo(routePrices[routeKey as keyof typeof routePrices]);
    } else {
      setRouteInfo(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.from && formData.to && formData.date && formData.time) {
      setShowConfirmation(true);
    }
  };

  const filteredLocations = locations.filter(location => location !== formData.from);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              >
                <option value="">Select pickup location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.to}
                onChange={(e) => handleDestinationChange(e.target.value)}
              >
                <option value="">Select destination</option>
                {filteredLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="time"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
        </div>

        {routeInfo && (
          <div className="bg-gray-50 p-4 rounded-md mt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Estimated travel time:</p>
                <p className="font-semibold">{routeInfo.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fare:</p>
                <p className="font-semibold text-[#8B0000]">{routeInfo.price}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#8B0000] text-white py-3 px-4 rounded-md hover:bg-[#A52A2A] transition-colors font-semibold"
        >
          Book Now
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Booking Confirmation</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2">Journey Details</h4>
                <p className="text-red-600">From: {formData.from}</p>
                <p className="text-gray-600">To: {formData.to}</p>
                <p className="text-gray-600">Date: {formData.date}</p>
                <p className="text-gray-600">Time: {formData.time}</p>
              </div>
              
              {routeInfo && (
                <div className="border-b pb-4">
                  <h4 className="font-semibold mb-2">Fare Details</h4>
                  <p className="text-gray-600">Amount: {routeInfo.price}</p>
                  <p className="text-gray-600">Duration: {routeInfo.duration}</p>
                </div>
              )}
              
              <div className="pt-4">
                <button
                  onClick={() => {
                    alert('Proceeding to payment...');
                    setShowConfirmation(false);
                  }}
                  className="w-full bg-[#8B0000] text-white py-3 px-4 rounded-md hover:bg-[#A52A2A] transition-colors font-semibold"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full mt-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;