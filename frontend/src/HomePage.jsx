import React, { useState, useEffect } from "react";
import CrackersCartTable from "./CrackersCartTable.jsx";
import Footer from "./Footer.jsx";
import { ShoppingCart } from "lucide-react";

export default function HomePage() {
  const year = new Date().getFullYear().toString();
  const [isPressed, setIsPressed] = useState(false);

  // State lifted here for products, quantities, modal toggle
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/products`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const setQuantityForId = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, value),
    }));
  };

  const getTotalItems = () =>
    Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const calculateGrandTotal = () => {
    return products
      .reduce((total, item) => {
        const quantity = quantities[item._id] || 0;
        const price = item.discountedPrice || item.actualPrice;
        return total + price * quantity;
      }, 0)
      .toFixed(2);
  };

  // Logo interaction handlers (unchanged)
  const handleLogoInteraction = () => {
    const isMobile = window.innerWidth <= 768;
    let pressTimer;
    let clickCount = 0;

    const mobileHandlers = {
      onTouchStart: (e) => {
        e.preventDefault();
        setIsPressed(true);
        pressTimer = setTimeout(() => {
          window.location.href = "/_admin";
        }, 800);
      },
      onTouchEnd: (e) => {
        e.preventDefault();
        setIsPressed(false);
        clearTimeout(pressTimer);
      },
      onTouchCancel: (e) => {
        e.preventDefault();
        setIsPressed(false);
        clearTimeout(pressTimer);
      },
    };

    const desktopHandlers = {
      onClick: (e) => {
        e.preventDefault();
        clickCount++;
        if (clickCount === 1) {
          setTimeout(() => {
            if (clickCount === 2) {
              window.location.href = "/_admin";
            }
            clickCount = 0;
          }, 300);
        }
      },
    };

    return isMobile ? mobileHandlers : desktopHandlers;
  };

  // Responsive Interactive Logo component
  const InteractiveLogo = () => (
    <div
      className={`cursor-pointer transition-all duration-200 select-none ${
        isPressed ? "scale-95 opacity-80" : "hover:scale-105"
      }`}
      {...handleLogoInteraction()}
    >
      <img
        src="./logo.png"
        alt="Selvaganapathy Traders Logo"
        className="h-14 w-14 object-contain m-0 p-0 transition-all duration-200 brightness-100"
        draggable={false}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen relative overflow-x-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    >
      {/* Floating Cart Summary - fixed bottom right, clickable */}
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 right-5 z-40 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white rounded-xl shadow-xl px-6 py-4 flex items-center space-x-4 cursor-pointer select-none hover:scale-105 transition-transform duration-300"
        title="Click to view cart"
      >
        {/* Cart Icon with Badge */}
        <div className="relative">
          <ShoppingCart size={32} className="text-white" />
          {/* Badge with count */}
          {getTotalItems() > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-lg">
              {getTotalItems() > 999 ? "999+" : getTotalItems()}
            </div>
          )}
        </div>

        {/* Total Price */}
        <div className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
          ₹ {calculateGrandTotal()}
        </div>
      </div>

      {/* Header with Interactive Logo and Shop Name in one line on mobile */}
      <header className="relative z-50 w-full bg-transparent">
        <div className="flex items-center justify-center mt-4 px-4 md:px-0 gap-2 md:gap-4 whitespace-nowrap">
          <div className="flex-shrink-0">
            <InteractiveLogo />
          </div>
          <div className="leading-none text-white text-left mt-7">
            <h1
              className="font-bold tracking-wide text-xl sm:text-2xl md:text-4xl"
              style={{ lineHeight: 1 }}
            >
              SELVAGANAPATHY TRADERS
            </h1>
            <p className="text-yellow-300 text-xs md:text-base font-medium tracking-wider text-center">
              Premium Fireworks & Crackers
            </p>
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
          {/* Hero Section with HAPPY DIWALI and Year */}
          <section className="text-center mb-12">
            <div className="max-w-4xl mx-auto">
              <h2
                className="sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
                style={{ fontSize: "3rem" }}
              >
                HAPPY DIWALI!
              </h2>
              {/* <div
                className="mb-6"
                aria-label="Current Year"
                role="heading"
                aria-level="3"
              >
                <div className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none opacity-90 flex justify-center space-x-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
                  {year.split("").map((digit, idx) => (
                    <span
                      key={idx}
                      className={`inline-block animate-pulse font-bold`}
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      {digit}
                    </span>
                  ))}
                </div>
              </div> */}
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                Celebrate the festival of lights with our premium collection of
                crackers and sparklers
              </p>
            </div>
          </section>

          {/* Products Section */}
          <section className="w-full">
            <div className="max-w-7xl mx-auto">
              <CrackersCartTable
                products={products}
                quantities={quantities}
                updateQuantity={updateQuantity}
                setQuantityForId={setQuantityForId}
                isLoading={isLoading}
                error={error}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
