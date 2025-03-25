
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, UserRound, LogOut } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/clerk-react';
import Cart from './Cart';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useAuth();

  // Update scrolled state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold"
          >
            <h1 className="font-playfair tracking-tight">ESSENCE</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:opacity-70 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:origin-bottom-right ${
                location.pathname === '/' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform after:duration-300`}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={`text-sm font-medium hover:opacity-70 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:origin-bottom-right ${
                location.pathname === '/shop' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform after:duration-300`}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className={`text-sm font-medium hover:opacity-70 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:origin-bottom-right ${
                location.pathname === '/collections' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform after:duration-300`}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium hover:opacity-70 transition-opacity relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black after:origin-bottom-right ${
                location.pathname === '/about' ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
              } after:transition-transform after:duration-300`}
            >
              About
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Auth Buttons or User Button */}
            {isSignedIn ? (
              <div className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
                <UserButton />
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <SignInButton mode="modal">
                  <button className="p-2 rounded-full hover:bg-black/5 transition-colors flex items-center text-sm font-medium">
                    <UserRound className="w-5 h-5 mr-1" />
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}
            
            {/* Cart Component */}
            <Cart />
            
            {/* Mobile menu button */}
            <button 
              className="p-2 rounded-full hover:bg-black/5 transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white/80 backdrop-blur-lg z-40 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 p-8">
          <Link 
            to="/" 
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className="text-2xl font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          {!isSignedIn && (
            <div className="flex flex-col space-y-4">
              <SignInButton mode="modal">
                <button className="text-xl font-medium flex items-center justify-center">
                  <UserRound className="w-5 h-5 mr-2" />
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-xl font-medium">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
