import React, { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import generateBill from '../src/generateBill.js';

const CrackersCartTable = () => {
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://firework-backend-d8br.onrender.com/api/products");
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

  // Group products by productType
  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.productType || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  const categorizedProducts = groupByCategory(products);

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const calculateTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const calculateGrandTotal = () => {
    return products
      .reduce((total, item) => {
        const quantity = quantities[item._id] || 0;
        return total + (item.discountedPrice || item.actualPrice) * quantity;
      }, 0)
      .toFixed(2);
  };

  const getSelectedItems = () => {
    return products.filter((item) => quantities[item._id] > 0);
  };

  const handleGenerateBill = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      return;
    }
    setPhoneError("");
    
    const selected = getSelectedItems();
    if (selected.length === 0) {
      alert("Please select at least one item to generate the bill.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address to receive the PDF.");
      return;
    }

    setLoading(true);
    try {
      await generateBill(getSelectedItems(), phone, email);
      alert(`Bill generated successfully`);
      setShowModal(false);
    } catch (err) {
      console.error("Bill generation error:", err); // <-- Add this for debugging
      alert("Failed to generate bill. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ title }) => (
    <div className="w-full bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 text-white py-4 px-6 mb-2 rounded-lg shadow-lg border border-white/20">
      <h3 className="text-lg font-bold tracking-wide">{title}</h3>
    </div>
  );

  const ProductRow = ({ item, index }) => {
    const quantity = quantities[item._id] || 0;
    const [inputValue, setInputValue] = useState(quantity.toString());
    const price = item.discountedPrice || item.actualPrice;
    const discount = item.discount || Math.round(
      ((item.actualPrice - price) / item.actualPrice) * 100
    );

    useEffect(() => {
      setInputValue((quantities[item._id] || 0).toString());
    }, [quantities[item._id]]);

    const handleInputChange = (e) => {
      const value = e.target.value;
      if (value === "" || /^\d+$/.test(value)) {
        setInputValue(value);
      }
    };

    const handleInputBlur = () => {
      const num = parseInt(inputValue, 10);
      setQuantities((prev) => ({
        ...prev,
        [item._id]: isNaN(num) ? 0 : num,
      }));
      setInputValue(isNaN(num) ? "0" : num.toString());
    };

    const handleDecrement = () => {
      const num = Math.max(0, (parseInt(inputValue, 10) || 0) - 1);
      setQuantities((prev) => ({
        ...prev,
        [item._id]: num,
      }));
      setInputValue(num.toString());
    };

    const handleIncrement = () => {
      const num = (parseInt(inputValue, 10) || 0) + 1;
      setQuantities((prev) => ({
        ...prev,
        [item._id]: num,
      }));
      setInputValue(num.toString());
    };

    const total = calculateTotal(price, quantity);

    return (
      <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-sm border border-white/10 rounded-xl mb-3 p-2 hover:shadow-xl transition-all duration-300">
        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-7 gap-4 items-center">
          <div className="flex justify-center">
            <div className="text-lg font-bold text-white bg-gray-700/50 p-3 rounded-full w-10 h-10 flex items-center justify-center">
              {index + 1}
            </div>
          </div>

          <div className="text-left">
            <div className="text-white font-semibold text-lg">
              {item.name}
            </div>
            <div className="text-gray-300 text-sm">{item.productDescription}</div>
          </div>

          <div className="text-center">
            <div className="text-red-400 font-semibold line-through text-lg">
              ₹{item.actualPrice.toFixed(2)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-green-400 font-bold text-xl">
              ₹{price.toFixed(2)}
            </div>
          </div>

          <div className="text-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs shadow-md">
              {discount}% OFF
            </span>
          </div>

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

          <div className="text-center">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              ₹{total}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-12 gap-1 items-center">
          <div className="col-span-1 flex justify-center">
            <div className="text-xs font-bold text-white bg-gray-700/50 p-1 rounded-full w-5 h-5 flex items-center justify-center">
              {index + 1}
            </div>
          </div>

          <div className="col-span-3 text-left pl-1">
            <div className="text-white font-semibold text-xs">
              {item.name}
            </div>
            <div className="text-gray-300 text-xxs">{item.productDescription}</div>
          </div>

          <div className="col-span-2 text-center">
            <div className="text-red-400 font-semibold line-through text-xxs">
              ₹{item.actualPrice.toFixed(2)}
            </div>
            <div className="text-green-400 font-bold text-xs">
              ₹{price.toFixed(2)}
            </div>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-0.1 py-0.1 rounded-full text-xs font-bold">
              {discount}% OFF
            </span>
          </div>

          <div className="col-span-3 flex justify-center items-center space-x-1">
            <button
              onClick={handleDecrement}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg text-xxs"
            >
              <Minus size={10} />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="bg-gray-800/70 text-white px-1 py-0.5 rounded-lg font-bold w-6 text-center border border-white/20 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-xxs"
              placeholder="0"
            />
            <button
              onClick={handleIncrement}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg text-xxs"
            >
              <Plus size={10} />
            </button>
          </div>

          <div className="col-span-3 text-center">
            <div className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              ₹{total}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl shadow-2xl overflow-hidden border border-white/20">
      {/* Desktop Table Header */}
      <div className="hidden md:block bg-gradient-to-r from-purple-800/80 via-indigo-800/80 to-blue-800/80 backdrop-blur-sm text-white border-y border-white/20 mx-4 rounded-lg mb-4">
        <div className="grid grid-cols-7 gap-4 px-6 py-4 font-bold text-sm">
          <div className="text-center">No.</div>
          <div className="text-left">Product Name</div>
          <div className="text-center">Actual Price</div>
          <div className="text-center">Discount Price</div>
          <div className="text-center">Discount</div>
          <div className="text-center">Quantity</div>
          <div className="text-center">Total</div>
        </div>
      </div>

      {/* Mobile Table Header */}
      <div className="md:hidden bg-gradient-to-r from-purple-800/80 via-indigo-800/80 to-blue-800/80 backdrop-blur-sm text-white border-y border-white/20 mx-2 rounded-lg mb-2 px-1 py-1">
        <div className="grid grid-cols-12 gap-1 text-xxs font-bold">
          <div className="col-span-1 text-center">No.</div>
          <div className="col-span-3 text-center">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-3 text-center">Quantity</div>
          <div className="col-span-3 text-center">Total</div>
        </div>
      </div>

      {/* Products */}
      <div className="px-1 md:px-4 pb-6">
        {Object.entries(categorizedProducts).map(([category, items]) => (
          <React.Fragment key={category}>
            <SectionHeader title={category.toUpperCase()} />
            <div className="space-y-1 md:space-y-3">
              {items.map((item, index) => (
                <ProductRow key={item._id} item={item} index={index} />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-gradient-to-r from-purple-800/50 via-indigo-800/50 to-blue-800/50 backdrop-blur-sm border-t-2 border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center px-2 md:px-6 py-3 md:py-6 space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-6 h-6 md:w-12 md:h-12 flex items-center justify-center font-bold text-xs md:text-lg shadow-lg">
              {getTotalItems()}
            </div>
            <span className="text-white font-semibold text-sm md:text-xl">
              {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="text-center md:text-right">
            <div className="text-xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400">
              ₹ {calculateGrandTotal()}
            </div>
            <div className="text-xxs md:text-sm text-gray-300">
              Total Amount
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white px-3 py-1.5 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-xs md:text-lg shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-1 md:space-x-2 border border-white/20"
            onClick={() => setShowModal(true)}
            disabled={getTotalItems() === 0}
          >
            <ShoppingCart size={14} className="md:w-6 md:h-6" />
            <span>View Cart</span>
          </button>
        </div>
      </div>

      {/* Modal for Bill Generation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg md:rounded-2xl shadow-2xl w-full max-w-md mx-2 md:mx-auto p-3 md:p-6 border border-white/20">
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-300 hover:text-white transition-colors"
                disabled={loading}
              >
                <X size={18} className="md:w-6 md:h-6" />
              </button>
            </div>

            <h2 className="text-lg md:text-2xl font-bold text-center text-white mb-3 md:mb-6">
              Generate Bill
            </h2>

            <div className="max-h-60 overflow-y-auto mb-2 md:mb-4 bg-black/20 rounded-lg p-1 md:p-4">
              {getSelectedItems().length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  No items selected
                </div>
              ) : (
                getSelectedItems().map((item) => {
                  const quantity = quantities[item._id] || 0;
                  const price = item.discountedPrice || item.actualPrice;
                  const total = calculateTotal(price, quantity);
                  return (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-1 md:py-3 border-b border-white/10 text-xs md:text-base"
                    >
                      <div className="text-white font-semibold truncate max-w-[50%]">
                        {item.name}{" "}
                        <span className="text-gray-400 text-xxs md:text-sm">
                          x{quantity}
                        </span>
                      </div>
                      <div className="text-green-400 font-bold text-xs md:text-base">
                        ₹{total}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex justify-between items-center py-1 md:py-3 font-bold text-base md:text-xl border-t border-white/20 mb-3 md:mb-6">
              <div className="text-white">Total Amount</div>
              <div className="text-green-400">₹{calculateGrandTotal()}</div>
            </div>

            <form onSubmit={handleGenerateBill} className="space-y-2 md:space-y-4">
              <div>
                <label className="block text-white text-xxs md:text-sm font-semibold mb-0.5 md:mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-2 py-1 md:px-4 md:py-3 bg-black/20 border rounded-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-pink-500 transition-all duration-200 text-white placeholder-gray-400 text-xs md:text-base ${
                    phoneError ? "border-red-500" : "border-white/20"
                  }`}
                  placeholder="Enter phone number"
                  required
                />
                {phoneError && (
                  <p className="text-red-400 text-xxs mt-0.5">{phoneError}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-xxs md:text-sm font-semibold mb-0.5 md:mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-1 md:px-4 md:py-3 bg-black/20 border border-white/20 rounded-lg focus:outline-none focus:ring-1 md:focus:ring-2 focus:ring-pink-500 transition-all duration-200 text-white placeholder-gray-400 text-xs md:text-base"
                  placeholder="Enter email address"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-1.5 md:py-3 px-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 md:space-x-2 shadow-xl text-xs md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || getSelectedItems().length === 0}
              >
                <ShoppingCart size={12} className="md:w-5 md:h-5" />
                <span>{loading ? "Generating..." : "Generate Bill"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrackersCartTable;