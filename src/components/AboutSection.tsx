import React, { useState, useEffect } from "react";

const AboutSection = () => {
  const images = [
    "https://i.postimg.cc/Bv24xFRH/mwendus.jpg",
    "https://i.postimg.cc/8PwJ2KCG/trinity.jpg",
    "https://i.postimg.cc/YSXwkFWh/trin333.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div>
            <h2 className="text-3xl font-bold mb-6">About Trinity Express</h2>
            <p className="text-gray-600 mb-4">
              Trinity Express is a leading bus service provider, offering
              reliable and comfortable transportation solutions across East
              Africa. Our routes connect major cities including Nairobi, Kigali,
              Kampala, and Juba, ensuring seamless travel experiences for our
              passengers.
            </p>
            <p className="text-gray-600 mb-4">
              With a commitment to excellence, Trinity Express operates a modern
              fleet of buses, providing safe and timely services. Our
              professional drivers and convenient online booking system make us
              the preferred choice for travelers. 🙂😂
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Modern fleet of comfortable buses</li>
              <li>✓ Professional and experienced drivers</li>
              <li>✓ Convenient online booking system</li>
              <li>✓ Reliable schedules and timely service</li>
              <li>✓ Extensive route network</li>
            </ul>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full h-[400px] overflow-visible">
            <img
              src={images[currentImageIndex]}
              alt="trinitybus"
              className={`rounded-lg shadow-lg w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
              key={currentImageIndex}
              />
              <div className="absolute -bottom-6 -left-6 bg-[#8B0000] text-white p-4 rounded-lg">
                <p className="text-2xl font-bold">10+</p>
                <p className="text-sm">Years of Quality services</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;