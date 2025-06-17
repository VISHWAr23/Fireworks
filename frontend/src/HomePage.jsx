import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Menu, X } from 'lucide-react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen " style={{
      background: 'linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)'
    }}>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6">
              <X className="w-6 h-6 text-white" />
            </button>
            <a href="#" className="text-white text-xl py-4 hover:text-pink-300 transition-colors">Home</a>
            <a href="#" className="text-white text-xl py-4 hover:text-pink-300 transition-colors">FAQ</a>
            <a href="#" className="text-white text-xl py-4 hover:text-pink-300 transition-colors">About</a>
            <a href="#" className="text-white text-xl py-4 hover:text-pink-300 transition-colors">Contacts</a>
          </div>
        </div>
      )}

      {/* Fireworks Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated firework bursts */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 animate-pulse">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 opacity-80 animate-ping"></div>
        </div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 animate-pulse delay-300">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 opacity-70 animate-ping"></div>
        </div>
        <div className="absolute top-2/3 right-1/5 w-10 h-10 animate-pulse delay-700">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-60 animate-ping"></div>
        </div>
        <div className="absolute top-1/4 right-2/5 w-8 h-8 animate-pulse delay-1000">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500 opacity-50 animate-ping"></div>
        </div>
        
        {/* Sparkle effects */}
        <div className="absolute top-1/6 right-1/6 text-yellow-300 animate-bounce delay-200">✨</div>
        <div className="absolute top-2/5 right-1/8 text-pink-300 animate-bounce delay-500">✨</div>
        <div className="absolute top-3/5 right-1/3 text-purple-300 animate-bounce delay-800">✨</div>
        <div className="absolute top-1/5 right-2/6 text-blue-300 animate-bounce delay-1100">✨</div>
      </div>

      {/* City skyline silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <div className="flex items-end justify-center h-full">
            <div className="w-8 h-16 bg-gray-900/60 mx-1"></div>
            <div className="w-6 h-20 bg-gray-900/60 mx-1"></div>
            <div className="w-10 h-12 bg-gray-900/60 mx-1"></div>
            <div className="w-8 h-18 bg-gray-900/60 mx-1"></div>
            <div className="w-12 h-16 bg-gray-900/60 mx-1"></div>
            <div className="w-6 h-14 bg-gray-900/60 mx-1"></div>
            <div className="w-8 h-22 bg-gray-900/60 mx-1"></div>
            <div className="w-10 h-18 bg-gray-900/60 mx-1"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6 text-white">
        <div className="text-xl font-bold">
          LOGO
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-pink-300 transition-colors">Home</a>
          <a href="#" className="hover:text-pink-300 transition-colors">FAQ</a>
          <a href="#" className="hover:text-pink-300 transition-colors">About</a>
          <a href="#" className="hover:text-pink-300 transition-colors">Contacts</a>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-8 md:py-12 min-h-[calc(100vh-80px)]">
        {/* Left Side Content */}
        <div className="flex-1 max-w-lg text-white text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            HAPPY<br />
            DIWALI!
          </h1>
          
          <p className="text-gray-300 mb-8 leading-relaxed text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <button className="w-full md:w-auto bg-transparent border-2 border-white px-6 md:px-8 py-3 text-white font-semibold hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105">
            JOIN US
          </button>
          
          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-8 md:mt-12">
            <a href="#" className="text-white hover:text-pink-300 transition-colors">
              <Facebook className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="#" className="text-white hover:text-pink-300 transition-colors">
              <Twitter className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="#" className="text-white hover:text-pink-300 transition-colors">
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>

        {/* Right Side - Large Year Display */}
        <div className="flex-1 flex justify-center items-center">
          <div className="text-white text-center md:text-right">
            <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none opacity-90 transform hover:scale-105 transition-transform duration-500">
              <span className="inline-block animate-pulse">2</span>
              <span className="inline-block animate-pulse delay-200">0</span>
              <span className="inline-block animate-pulse delay-400">2</span>
              <span className="inline-block animate-pulse delay-600">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* City skyline - make it responsive */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/40 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
          <div className="flex items-end justify-center h-full">
            <div className="w-4 md:w-8 h-12 md:h-16 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-3 md:w-6 h-14 md:h-20 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-5 md:w-10 h-10 md:h-12 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-4 md:w-8 h-16 md:h-18 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-6 md:w-12 h-12 md:h-16 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-3 md:w-6 h-10 md:h-14 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-4 md:w-8 h-18 md:h-22 bg-gray-900/60 mx-0.5 md:mx-1"></div>
            <div className="w-5 md:w-10 h-14 md:h-18 bg-gray-900/60 mx-0.5 md:mx-1"></div>
          </div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-bounce opacity-60 delay-300"></div>
        <div className="absolute top-3/4 left-1/6 w-1 h-1 bg-pink-300 rounded-full animate-bounce opacity-70 delay-700"></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-purple-300 rounded-full animate-bounce opacity-50 delay-1000"></div>
        <div className="absolute top-2/3 left-2/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-60 delay-1300"></div>
      </div>
    </div>
  );
}