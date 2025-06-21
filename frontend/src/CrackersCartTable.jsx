import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import generateBill from "./generateBill"; // Adjust the import path as needed

const CrackersTable = () => {
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Sample data
  const crackersData = [
    {
      id: 1,
      productName: "2 3/4' Kuruvi Crackers",
      actualPrice: 22.5,
      discountPrice: 13.5,
      image: "🎆",
      description: "1 Pkt"
    },
    {
      id: 2,
      productName: "2 3/4' Kuruvi Deluxe",
      actualPrice: 25,
      discountPrice: 15,
      image: "🎇",
      description: "1 Pkt"
    },
    {
      id: 3,
      productName: "3 1/2' Lakshmi Crackers",
      actualPrice: 45,
      discountPrice: 27,
      image: "🧨",
      description: "1 Pkt"
    },
    {
      id: 4,
      productName: "4' Lakshmi Crackers",
      actualPrice: 57.5,
      discountPrice: 34.5,
      image: "🎆",
      description: "1 Pkt"
    },
    {
      id: 5,
      productName: "4' Deluxe Lakshmi",
      actualPrice: 67.5,
      discountPrice: 40.5,
      image: "🎇",
      description: "1 Pkt"
    }
  ];

  const bijliCrackersData = [
    {
      id: 6,
      productName: "Electric Spark Crackers",
      actualPrice: 35,
      discountPrice: 21,
      image: "⚡",
      description: "1 Pkt"
    },
    {
      id: 7,
      productName: "Thunder Bolt Special",
      actualPrice: 55,
      discountPrice: 33,
      image: "🌩️",
      description: "1 Pkt"
    }
  ];

  const updateQuantity = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const calculateGrandTotal = () => {
    const allData = [...crackersData, ...bijliCrackersData];
    return allData.reduce((total, item) => {
      const quantity = quantities[item.id] || 0;
      return total + (item.discountPrice * quantity);
    }, 0).toFixed(2);
  };

  const getSelectedItems = () => {
    const allData = [...crackersData, ...bijliCrackersData];
    return allData.filter(item => quantities[item.id] > 0);
  };


    async function sendPDF(bill, email) {
    // const { jsPDF } = window.jspdf;
    // const doc = new jsPDF();
    // doc.text("Hello World from jsPDF!", 10, 10);
    const blob = bill;
    // console.log(email);
    const formData = new FormData();
    formData.append("file", blob, "bill.pdf", email);
    formData.append("email", email); 
    await fetch("http://localhost:3000/send-pdf", {
      method: "POST",
      body: formData,
    });

    // alert("PDF sent to server!");
  }


  // Modal submit handler
  const handleGenerateBill = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      return;
    }
    setPhoneError("");
    // Only pass items with quantity > 0 and set defaultQuantity for PDF
    const selected = getSelectedItems().map((item) => ({
      ...item,
      defaultQuantity: quantities[item.id] || 0,
    }));

    sendPDF(generateBill(selected, phone, email), email);
    // alert("Bill generated!");
    setShowModal(false);
  };

  const SectionHeader = ({ title, discount }) => (
    <div className="w-full bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white py-4 px-6 mb-2 rounded-lg shadow-lg border border-white/20">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold tracking-wide">{title}</h3>
        {/* <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
          {discount} DISCOUNT
        </span> */}
      </div>
    </div>
  );

  const ProductRow = ({ item }) => {
    const quantity = quantities[item.id] || 0;
    const [inputValue, setInputValue] = useState(quantity.toString());

    // Sync inputValue with quantities when quantities change externally
    React.useEffect(() => {
      setInputValue((quantities[item.id] || 0).toString());
    }, [quantities[item.id]]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      // Allow empty string or numbers only
      if (value === '' || /^\d+$/.test(value)) {
        setInputValue(value);
      }
    };

    const handleInputBlur = () => {
      // On blur, update the main quantities state
      const num = parseInt(inputValue, 10);
      setQuantities(prev => ({
        ...prev,
        [item.id]: isNaN(num) ? 0 : num
      }));
      setInputValue(isNaN(num) ? '0' : num.toString());
    };

    const handleDecrement = () => {
      const num = Math.max(0, (parseInt(inputValue, 10) || 0) - 1);
      setQuantities(prev => ({
        ...prev,
        [item.id]: num
      }));
      setInputValue(num.toString());
    };

    const handleIncrement = () => {
      const num = (parseInt(inputValue, 10) || 0) + 1;
      setQuantities(prev => ({
        ...prev,
        [item.id]: num
      }));
      setInputValue(num.toString());
    };

    const total = calculateTotal(item.discountPrice, quantities[item.id] || 0);
    const discount = Math.round(((item.actualPrice - item.discountPrice) / item.actualPrice) * 100);

    return (
      <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 rounded-xl mb-3 p-4 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-7 gap-4 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <div className="text-4xl bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
              {item.image}
            </div>
          </div>
          
          {/* Product Name */}
          <div className="text-left">
            <div className="text-white font-semibold text-lg">{item.productName}</div>
            <div className="text-gray-300 text-sm">{item.description}</div>
          </div>
          
          {/* Actual Price */}
          <div className="text-center">
            <div className="text-red-400 font-semibold line-through text-lg">₹{item.actualPrice}</div>
          </div>
          
          {/* Discount Price */}
          <div className="text-center">
            <div className="text-green-400 font-bold text-xl">₹{item.discountPrice}</div>
          </div>
          
          {/* Discount */}
          <div className="text-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {discount}% OFF
            </span>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Minus size={16} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="bg-gray-800/70 text-white px-3 py-2 rounded-lg font-bold text-lg w-16 text-center border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="0"
            />
            <button
              onClick={handleIncrement}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Total */}
          <div className="text-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              ₹{total}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-full shadow-lg">
              {item.image}
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-lg">{item.productName}</div>
              <div className="text-gray-300 text-sm">{item.description}</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-red-400 font-semibold line-through">₹{item.actualPrice}</div>
              <div className="text-green-400 font-bold text-xl">₹{item.discountPrice}</div>
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {discount}% OFF
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrement}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg"
              >
                <Minus size={14} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="bg-gray-800/70 text-white px-2 py-1 rounded-lg font-bold w-14 text-center border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0"
              />
              <button
                onClick={handleIncrement}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              Total: ₹{total}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-white/20 relative"
      style={{
        background: "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    >
      {/* Sparkle Effects */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-4 text-yellow-300 animate-bounce delay-200 text-2xl">✨</div>
        <div className="absolute top-20 left-8 text-pink-300 animate-bounce delay-500 text-2xl">⭐</div>
        <div className="absolute bottom-20 right-12 text-purple-300 animate-bounce delay-800 text-2xl">💫</div>
        <div className="absolute top-1/2 left-4 text-blue-300 animate-bounce delay-1000 text-xl">🌟</div>
        <div className="absolute bottom-4 left-1/3 text-yellow-300 animate-bounce delay-300 text-xl">✨</div>
      </div> */}

      {/* Header */}
      <div className="text-center py-8 relative">
        {/* <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-2">
          2025
        </h1> */}
        <p className="text-gray-300 text-lg">Premium Crackers Collection</p>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden md:block bg-gradient-to-r from-purple-800/80 via-indigo-800/80 to-blue-800/80 backdrop-blur-sm text-white border-y border-white/20 mx-4 rounded-lg mb-4">
        <div className="grid grid-cols-7 gap-4 px-6 py-4 font-bold text-sm">
          <div className="text-center">Image</div>
          <div className="text-left">Product Name</div>
          <div className="text-center">Actual Price</div>
          <div className="text-center">Discount Price</div>
          <div className="text-center">Discount</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Total</div>
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pb-6">
        <SectionHeader title="ONE SOUND CRACKERS"  />
        <div className="space-y-3">
          {crackersData.map((item) => (
            <ProductRow key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-8">
          <SectionHeader title="BIJLI CRACKERS"  />
          <div className="space-y-3">
            {bijliCrackersData.map((item) => (
              <ProductRow key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      <div className="bg-gradient-to-r from-purple-800/50 via-indigo-800/50 to-blue-800/50 backdrop-blur-sm border-t-2 border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg">
              {getTotalItems()}
            </div>
            <span className="text-white font-semibold text-xl">
              {getTotalItems()} items
            </span>
          </div>

          <div className="text-center md:text-right">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              ₹ {calculateGrandTotal()}
            </div>
            <div className="text-sm text-gray-300">Total Amount</div>
          </div>

          <button
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 border border-white/20"
            onClick={() => setShowModal(true)}
          >
            <ShoppingCart size={24} />
            <span>View Cart</span>
          </button>
        </div>
      </div>

      {/* Modal for Bill Generation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6 border border-white/20">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-center text-white mb-6">
              Generate Bill
            </h2>

            {/* Selected Items List */}
            <div className="max-h-60 overflow-y-auto mb-4 bg-black/20 rounded-lg p-4">
              {getSelectedItems().length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  No items selected
                </div>
              ) : (
                getSelectedItems().map((item) => {
                  const quantity = quantities[item.id] || 0;
                  const total = calculateTotal(item.discountPrice, quantity);
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-3 border-b border-white/10"
                    >
                      <div className="text-white font-semibold">
                        {item.productName}{" "}
                        <span className="text-gray-400 text-sm">
                          x{quantity}
                        </span>
                      </div>
                      <div className="text-green-400 font-bold">₹{total}</div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center py-3 font-bold text-xl border-t border-white/20 mb-6">
              <div className="text-white">Total Amount</div>
              <div className="text-green-400">₹{calculateGrandTotal()}</div>
            </div>

            {/* User Details Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 bg-black/20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 text-white placeholder-gray-400 ${
                    phoneError ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="Enter your phone number"
                />
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 text-white placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                onClick={handleGenerateBill}
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl transform hover:scale-105"
              >
                <ShoppingCart size={20} />
                <span>Generate Bill</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrackersTable;