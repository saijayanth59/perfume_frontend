
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-16 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col">
            <Link to="/" className="text-xl font-bold mb-4">
              <h2 className="font-playfair tracking-tight">ESSENCE</h2>
            </Link>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              Discover the art of scent with our curated collection of premium fragrances designed to evoke emotion and create lasting impressions.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full hover:bg-black hover:text-white transition-colors border border-gray-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Shop */}
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/shop/women" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Women's Fragrances
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop/men" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Men's Fragrances
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop/unisex" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Unisex Collections
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop/new" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop/bestsellers" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* About */}
          <div>
            <h3 className="font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link 
                  to="/about/craftmanship" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Craftsmanship
                </Link>
              </li>
              <li>
                <Link 
                  to="/about/sustainability" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-500 hover:text-black transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-medium mb-4">Stay Connected</h3>
            <p className="text-gray-500 text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and fragrance tips.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="py-2 px-4 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-black w-full"
              />
              <button 
                type="submit" 
                className="py-2 px-4 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors"
                aria-label="Subscribe"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ESSENCE. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <Link 
              to="/privacy" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              to="/shipping" 
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Shipping Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
