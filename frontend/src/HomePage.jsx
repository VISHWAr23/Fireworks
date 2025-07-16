import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Menu, X } from "lucide-react";
import CrackersCartTable from "./CrackersCartTable.jsx";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    >
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <a
              href="#"
              className="text-white text-xl py-4 hover:text-pink-300 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white text-xl py-4 hover:text-pink-300 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-white text-xl py-4 hover:text-pink-300 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-white text-xl py-4 hover:text-pink-300 transition-colors"
            >
              Contacts
            </a>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6 text-white">
        <div className="text-xl font-bold">DIWALI STORE</div>
        <div className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-pink-300 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            FAQ
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            Contacts
          </a>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Fireworks Animation */}
      <div className="absolute inset-0 pointer-events-none">
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
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-2 sm:px-4 md:px-6 py-6 md:py-12">
        {/* Left Side Content */}
        <div className="w-full max-w-lg text-white text-center md:text-left mb-6">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
            HAPPY
            <br />
            DIWALI!
          </h1>
          <p className="text-gray-300 mb-6 md:mb-8 leading-relaxed text-xs xs:text-sm md:text-base">
            Celebrate the festival of lights with our premium collection of crackers and sparklers
          </p>
          <div className="w-full flex justify-center items-center mb-6">
            <div className="text-white text-center w-full">
              <div className="text-5xl xs:text-6xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none opacity-90">
                <span className="inline-block animate-pulse font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">2</span>
                <span className="inline-block animate-pulse delay-200 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">0</span>
                <span className="inline-block animate-pulse delay-400 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">2</span>
                <span className="inline-block animate-pulse delay-600 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* CrackersCartTable */}
        <div className="w-full max-w-7xl">
          <CrackersCartTable />
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-start space-x-4 mt-6 md:mt-12">
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
      </main>

      {/* City skyline silhouette */}
      <div className="relative z-10">
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black/40 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
            <div className="flex items-end justify-center h-full">
              {[8, 6, 10, 8, 12, 6, 8, 10].map((height, index) => (
                <div 
                  key={index}
                  className={`w-4 md:w-8 h-${height} md:h-${height * 2} bg-gray-900/60 mx-0.5 md:mx-1`}
                  style={{ height: `${height * 4}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}