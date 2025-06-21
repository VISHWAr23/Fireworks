import React, { useState, useEffect } from "react";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import generateBill from "./generateBill"; // Adjust the import path as needed

export default function CrackersCartTable() {
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const crackersData = [
    {
      id: 1,
      image: "🎆",
      productName: "2 3/4' Kuruvi Crackers",
      actualPrice: 22.5,
      discountPrice: 13.5,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 2,
      image: "🎇",
      productName: "2 3/4' Kuruvi Deluxe",
      actualPrice: 25,
      discountPrice: 15.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 3,
      image: "",
      productName: "3 1/2' Lakshmi Crackers",
      actualPrice: 45,
      discountPrice: 27.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 4,
      image: "🎊",
      productName: "4' Lakshmi Crackers",
      actualPrice: 57.5,
      discountPrice: 34.5,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 5,
      image: "🎉",
      productName: "4' Deluxe Lakshmi",
      actualPrice: 67.5,
      discountPrice: 40.5,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 6,
      image: "🌟",
      productName: "3 1/2' Two Sound",
      actualPrice: 75,
      discountPrice: 45.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 7,
      image: "💫",
      productName: "4' Gold Lakshmi",
      actualPrice: 80,
      discountPrice: 48.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 8,
      image: "🎭",
      productName: "5' Kamsan",
      actualPrice: 135,
      discountPrice: 81.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 9,
      image: "🏮",
      productName: "Avatar - I",
      actualPrice: 710,
      discountPrice: 426.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
  ];

  const bijliCrackersData = [
    {
      id: 10,
      image: "⚡",
      productName: "Electric Bijli Special",
      actualPrice: 45.0,
      discountPrice: 27.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 11,
      image: "🔥",
      productName: "Thunder Bijli Deluxe",
      actualPrice: 65.0,
      discountPrice: 39.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
    {
      id: 12,
      image: "⭐",
      productName: "Super Bijli Crackers",
      actualPrice: 85.0,
      discountPrice: 51.0,
      discount: "60%",
      defaultQuantity: 0,
      pack: "PKT",
    },
  ];

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    [...crackersData, ...bijliCrackersData].forEach((item) => {
      initialQuantities[item.id] = item.defaultQuantity;
    });
    setQuantities(initialQuantities);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 0) {
      setQuantities((prev) => ({
        ...prev,
        [id]: newQuantity,
      }));
    }
  };

  const calculateTotal = (discountPrice, quantity) => {
    return (discountPrice * quantity).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return [...crackersData, ...bijliCrackersData]
      .reduce((total, item) => {
        const quantity = quantities[item.id] || 0;
        return total + item.discountPrice * quantity;
      }, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const QuantityControl = ({ id, quantity }) => (
    <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
      <button
        onClick={() => updateQuantity(id, quantity - 1)}
        className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <Minus size={14} />
      </button>
      <input
        type="number"
        value={quantity || 0}
        onChange={(e) => updateQuantity(id, parseInt(e.target.value) || 0)}
        className="w-16 text-center bg-transparent text-white font-bold text-sm border border-white/30 rounded px-2 py-1 focus:outline-none focus:border-pink-400"
        min="0"
      />
      <button
        onClick={() => updateQuantity(id, quantity + 1)}
        className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <Plus size={14} />
      </button>
    </div>
  );

  const ProductRow = ({ item, isOdd }) => {
    const quantity = quantities[item.id] || 0;
    const total = calculateTotal(item.discountPrice, quantity);

    return (
      <>
        {/* Desktop View */}
        <tr
          className={`hidden md:table-row ${
            isOdd ? "bg-white/5" : "bg-white/10"
          } hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 border-b border-white/10`}
        >
          <td className="px-4 py-4 text-center">
            <div className="text-3xl animate-pulse">{item.image}</div>
          </td>
          <td className="px-4 py-4">
            <div className="text-white font-semibold text-sm">
              {item.productName}
            </div>
            <div className="text-gray-300 text-xs">1 Pkt</div>
          </td>
          <td className="px-4 py-4 text-center">
            <span className="line-through text-red-400 font-bold text-sm">
              ₹{item.actualPrice}
            </span>
          </td>
          <td className="px-4 py-4 text-center">
            <span className="text-green-400 font-bold">
              ₹{item.discountPrice}
            </span>
          </td>
          <td className="px-4 py-4 text-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {item.discount} OFF
            </span>
          </td>
          <td className="px-4 py-4 text-center">
            <QuantityControl id={item.id} quantity={quantity} />
          </td>
          <td className="px-4 py-4 text-center">
            <span className="text-green-400 font-bold text-lg">₹{total}</span>
          </td>
        </tr>

        {/* Mobile View */}
        <div className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-3 border border-white/20">
          <div className="flex items-start space-x-3">
            <div className="text-2xl animate-pulse">{item.image}</div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm mb-1">
                {item.productName}
              </h3>
              <div className="text-gray-300 text-xs mb-2">1 item.pack</div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-2">
                  <span className="line-through text-red-400 text-sm">
                    ₹{item.actualPrice}
                  </span>
                  <span className="text-green-400 font-bold">
                    ₹{item.discountPrice}
                  </span>
                </div>
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {item.discount} OFF
                </span>
              </div>

              <div className="flex justify-between items-center">
                <QuantityControl id={item.id} quantity={quantity} />
                <span className="text-green-400 font-bold text-lg">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SectionHeader = ({ title, discount }) => (
    <>
      {/* Desktop Section Header */}
      <tr className="hidden md:table-row">
        <td colSpan="7" className="px-0 py-0">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-center py-4 font-bold text-lg shadow-lg border-y border-white/20">
            <span className="text-xl">
               {title} ({discount} DISCOUNT)
            </span>
          </div>
        </td>
      </tr>

      {/* Mobile Section Header */}
      <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-center py-3 font-bold text-lg shadow-lg rounded-lg mb-4 border border-white/20">
        <span className="text-lg">
           {title} ({discount} DISCOUNT) 
        </span>
      </div>
    </>
  );

  // Get items with quantity > 0
  const getSelectedItems = () => {
    const allItems = [...crackersData, ...bijliCrackersData];
    return allItems.filter((item) => (quantities[item.id] || 0) > 0);
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

    alert("PDF sent to server!");
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
    alert("Bill generated!");
    setShowModal(false);
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto rounded-2xl shadow-2xl overflow-hidden border border-white/20 relative"
      style={{
        background:
          "linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #7209b7 100%)",
      }}
    >
      {/* Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 right-4 text-yellow-300 animate-bounce delay-200">
          
        </div>
        <div className="absolute top-20 left-8 text-pink-300 animate-bounce delay-500">
          
        </div>
        <div className="absolute bottom-20 right-12 text-purple-300 animate-bounce delay-800">
          
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden md:block bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white border-b border-white/20">
        <div className="grid grid-cols-7 gap-2 px-4 py-4 font-bold text-sm">
          <div className="text-center">Image</div>
          <div className="text-left">Product Name</div>
          <div className="text-center">Actual Price</div>
          <div className="text-center">Discount Price</div>
          <div className="text-center">Discount</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Total</div>
        </div>
      </div>

      {/* Desktop Table Body */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <tbody>
            <SectionHeader title="ONE SOUND CRACKERS"  />
            {crackersData.map((item, index) => (
              <ProductRow key={item.id} item={item} isOdd={index % 2 === 0} />
            ))}

            <SectionHeader title="BIJLI CRACKERS"  />
            {bijliCrackersData.map((item, index) => (
              <ProductRow key={item.id} item={item} isOdd={index % 2 === 0} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden p-4">
        <SectionHeader title="ONE SOUND CRACKERS" />
        {crackersData.map((item, index) => (
          <ProductRow key={item.id} item={item} isOdd={index % 2 === 0} />
        ))}

        <SectionHeader title="BIJLI CRACKERS"  />
        {bijliCrackersData.map((item, index) => (
          <ProductRow key={item.id} item={item} isOdd={index % 2 === 0} />
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-gradient-to-r from-purple-800/50 via-indigo-800/50 to-blue-800/50 backdrop-blur-sm border-t-2 border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg">
              {getTotalItems()}
            </div>
            <span className="text-white font-semibold text-lg">
              {getTotalItems()} items
            </span>
          </div>

          <div className="text-center md:text-right">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
              Generate Bill
            </h2>

            {/* Selected Items List */}
            <div className="max-h-60 overflow-y-auto mb-4">
              {getSelectedItems().length === 0 ? (
                <div className="text-center text-gray-500 py-4">
                  No items selected
                </div>
              ) : (
                getSelectedItems().map((item) => {
                  const quantity = quantities[item.id] || 0;
                  const total = calculateTotal(item.discountPrice, quantity);
                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-2 border-b border-gray-200"
                    >
                      <div className="text-gray-800 font-semibold">
                        {item.productName}{" "}
                        <span className="text-gray-500 text-sm">
                          x{quantity}
                        </span>
                      </div>
                      <div className="text-green-500 font-bold">₹{total}</div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center py-2 font-bold text-lg border-t border-gray-200">
              <div className="text-gray-800">Total Amount</div>
              <div className="text-green-500">₹{calculateGrandTotal()}</div>
            </div>

            {/* User Details Form */}
            <form onSubmit={handleGenerateBill} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Generate Bill</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
