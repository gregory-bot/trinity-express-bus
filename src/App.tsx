import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import RouteCard from './components/RouteCard';
import AboutSection from './components/AboutSection';
import MoreSection from './components/MoreSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  const popularRoutes = [
    {
      from: "Nairobi",
      to: "Kigali",
      price: "KSh 7000",
      time: "12 HOURS",
      nextBus: "5:30 PM"
    },
    {
      from: "Nairobi",
      to: "Kampala",
      price: "KSh 4000",
      time: "10 HOURS",
      nextBus: "5:45 PM"
    },
    {
      from: "Kampala",
      to: "Juba",
      price: "UGX 130000 /KSH 4,940",
      time: "14 HOURS",
      nextBus: "6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Booking Section */}
      <section id="book" className="bg-gray-50 py-16">
        <div className="container bg-gray-50 mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-blue-100 rounded-lg shadow-lg p-6 mb-16">
            <h2 className="text-2xl font-bold text-green-600 mb-6"  style={{ fontFamily: 'Courier New, monospace', fontWeight: 'normal' }}>Get your ticket</h2>
            <BookingForm />
          </div>

          {/* Popular Routes */}
          <h2 className="text-2xl font-bold text-green-600 mb-6"  style={{ fontFamily: 'Courier New, monospace', fontWeight: 'normal' }}>Popular Routes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <RouteCard key={index} {...route} />
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <MoreSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;