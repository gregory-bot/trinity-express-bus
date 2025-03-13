import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-2 py-4">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} @trinityexpress. all rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;