import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  time: string;
  nextBus: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, time, nextBus }) => {
  const handleBookNowClick = () => {
    const bookingSection = document.getElementById('book');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-blue-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{from}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold">{to}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Travel Time:</span>
          <span className="font-medium">{time}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Next Bus:</span>
          <span className="font-medium">{nextBus}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-blue-600">{price}</span>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;