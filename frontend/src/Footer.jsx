import { Mail, Phone, MapPin, Clock, Star, Shield, Truck, Award, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Animated background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                🎆 Light Up Your Celebrations!
              </span>
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Subscribe to get exclusive fireworks deals, safety tips, and early access to festival collections
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">SELVAGANAPATHY TRADERS</h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted fireworks destination since 1995. We specialize in premium quality fireworks, 
              crackers, and celebration essentials for all your festive occasions. Licensed dealer with 
              international safety standards.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="w-5 h-5 mr-3 text-red-400" />
                <span>Main Road, Kananjampatti, Sivakasi-Vembakkottai Road, Tamil Nadu</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-5 h-5 mr-3 text-green-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-blue-400" />
                <span>info@selvaganapathytraders.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="w-5 h-5 mr-3 text-yellow-400" />
                <span>Mon-Sat: 9AM-8PM | Sun: 10AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                'Diwali Collection',
                'Wedding Fireworks',
                'Festival Crackers',
                'Gift Hampers',
                'Bulk Orders',
                'Safety Guide',
                'Track Order',
                'Customer Reviews'
              ].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Features */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Our Services</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Safety Certified</h4>
                  <p className="text-gray-400 text-sm">Licensed & insured dealer</p>
                </div>
              </div>
              <div className="flex items-start">
                <Truck className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Fast Delivery</h4>
                  <p className="text-gray-400 text-sm">Same day local delivery</p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Premium Quality</h4>
                  <p className="text-gray-400 text-sm">Tested & guaranteed products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Map Section */}
        <div className="py-8 border-t border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Visit Our Store</h3>
              <img
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                src="./Location_Pic.jpg"
                alt="SELVAGANAPATHY TRADERS Store Front"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Find Us Here</h3>
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Selvaganapathy Traders Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.066181047013!2d77.7979787!3d9.4979634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06c6c6e5e0e7b7%3A0x2e2c0e3e4e7e7e7e!2sSelvaganapathy%20Traders!5e0!3m2!1sen!2sin!4v1717171717171!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
              <p>© 2024 Selvaganapathy Traders. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <span>|</span>
                <a href="#" className="hover:text-white transition-colors">Safety Guidelines</a>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {[
                { Icon: Facebook, color: 'hover:text-blue-400' },
                { Icon: Instagram, color: 'hover:text-pink-400' },
                { Icon: Twitter, color: 'hover:text-sky-400' },
                { Icon: Youtube, color: 'hover:text-red-400' }
              ].map(({ Icon, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-gray-400 ${color} transition-all duration-200 transform hover:scale-110`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Banner */}
        <div className="pb-6">
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-yellow-200 text-sm">
              ⚠️ <strong>Safety First:</strong> Always follow fireworks safety guidelines. Keep water nearby. Adult supervision required. 
              <a href="#" className="text-yellow-400 hover:text-yellow-300 underline ml-1">Read Safety Guide</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}