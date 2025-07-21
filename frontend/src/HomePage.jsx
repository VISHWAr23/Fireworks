import React from "react";
import CrackersCartTable from "./CrackersCartTable.jsx";
import Footer from "./Footer.jsx";

export default function HomePage() {
  const year = new Date().getFullYear().toString();

  return (
    <div
      className="min-h-screen relative overflow-x-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    >
      {/* Header with Logo */}
      <header className="relative z-10 w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="./logo.png" 
                alt="Selvaganapathy Traders Logo" 
                className="h-16 w-16 object-contain"
              />
              <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  SELVAGANAPATHY TRADERS
                </h1>
                <p className="text-yellow-300 text-sm md:text-base font-medium tracking-wider">
                  Premium Fireworks & Crackers
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

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
      <main className="relative z-10 flex-1 w-full">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                HAPPY
                DIWALI!
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                Celebrate the festival of lights with our premium collection of
                crackers and sparklers
              </p>
              
              {/* Year Display */}
              <div className="mb-12">
                <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none opacity-90">
                  <span className="inline-block animate-pulse font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mr-2">
                    {year[0]}
                  </span>
                  <span className="inline-block animate-pulse delay-200 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mr-2">
                    {year[1]}
                  </span>
                  <span className="inline-block animate-pulse delay-400 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mr-2">
                    {year[2]}
                  </span>
                  <span className="inline-block animate-pulse delay-600 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                    {year[3]}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Products Section */}
          <section className="w-full">
            <div className="max-w-7xl mx-auto">
              <CrackersCartTable />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
