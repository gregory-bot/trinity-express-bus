import React, { useState } from 'react';
import { MapPin, Calendar, Clock, X, Phone } from 'lucide-react';
import { initiateSTKPush } from '../services/mpesaService';

interface RouteInfo {
  price: string;
  duration: string;
}

interface STKPushResponse {
  ResponseCode: string;
  ResponseDescription: string;
  CheckoutRequestID: string;
  MerchantRequestID: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    phoneNumber: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  const locations = [
    "NAIROBI",
    "KIGALI",
    "KAMPALA",
    "JUBA"
  ];

  const routePrices: Record<string, RouteInfo> = {
    "NAIROBI-KIGALI": { price: "7000", duration: "12 hours" },
    "NAIROBI-KAMPALA": { price: "4000", duration: "10 hours" },
    "NAIROBI-JUBA": { price: "9000", duration: "15 hours" },
    "KIGALI-NAIROBI": { price: "7200", duration: "12 hours" },
    "KIGALI-KAMPALA": { price: "3000", duration: "8 hours" },
    "KAMPALA-NAIROBI": { price: "3800", duration: "10 hours" },
    "KAMPALA-JUBA": { price: "4940", duration: "14 hours" },
    "KAMPALA-KIGALI": { price: "3800", duration: "8 hours" }
  };

  const handleDestinationChange = (destination: string) => {
    setFormData(prev => ({ ...prev, to: destination }));
    const routeKey = `${formData.from}-${destination}`;
    if (routeKey in routePrices) {
      setRouteInfo(routePrices[routeKey]);
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

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phoneNumber) {
      setShowPhoneInput(false);
      handlePayment();
    }
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus('processing');
      setErrorMessage('');
      
      if (!routeInfo) {
        throw new Error('Route information not available');
      }

      if (!formData.phoneNumber) {
        setShowPhoneInput(true);
        return;
      }

      const amount = parseInt(routeInfo.price);
      const response = await initiateSTKPush(amount, formData.phoneNumber) as STKPushResponse;
      
      if (response.ResponseCode === '0') {
        setPaymentStatus('success');
        // You can add additional logic here to handle successful payment
        // For example, saving the booking to a database
      } else {
        setPaymentStatus('error');
        setErrorMessage('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('An error occurred during payment. Please try again.');
      console.error('Payment error:', error);
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
                <p className="font-semibold text-[#8B0000]">KSh {routeInfo.price}</p>
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

      {/* Phone Number Input Modal */}
      {showPhoneInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Enter Phone Number</h3>
              <button
                onClick={() => setShowPhoneInput(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  M-Pesa Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="254XXXXXXXXX"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    pattern="254[0-9]{9}"
                    required
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Format: 254XXXXXXXXX (e.g., 254712345678)
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#8B0000] text-white py-2 px-4 rounded-md hover:bg-[#A52A2A] transition-colors"
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => setShowPhoneInput(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  <p className="text-gray-600">Amount: KSh {routeInfo.price}</p>
                  <p className="text-gray-600">Duration: {routeInfo.duration}</p>
                </div>
              )}
              
              <div className="pt-4">
                {paymentStatus === 'idle' && (
                  <button
                    onClick={handlePayment}
                    className="w-full bg-[#8B0000] text-white py-3 px-4 rounded-md hover:bg-[#A52A2A] transition-colors font-semibold"
                  >
                    Pay with M-Pesa
                  </button>
                )}
                
                {paymentStatus === 'processing' && (
                  <div className="text-center py-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B0000] mx-auto"></div>
                    <p className="mt-2 text-gray-600">Processing payment...</p>
                  </div>
                )}
                
                {paymentStatus === 'success' && (
                  <div className="text-center py-3">
                    <p className="text-green-600 font-semibold">STK Push initiated successfully!</p>
                    <p className="text-sm text-gray-600 mt-2">Please check your phone for the M-Pesa prompt to enter your PIN.</p>
                  </div>
                )}
                
                {paymentStatus === 'error' && (
                  <div className="text-center py-3">
                    <p className="text-red-600 font-semibold">Payment failed</p>
                    <p className="text-sm text-gray-600 mt-2">{errorMessage}</p>
                    <button
                      onClick={handlePayment}
                      className="mt-4 w-full bg-[#8B0000] text-white py-3 px-4 rounded-md hover:bg-[#A52A2A] transition-colors font-semibold"
                    >
                      Try Again
                    </button>
                  </div>
                )}
                
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