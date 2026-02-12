import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Detect Scroll for "Glass" effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 1. LOGO (Text or Image) */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          {/* Replace with your logo img if you have one */}
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span>Akruti<span className="text-blue-600">.</span></span>
        </Link>

        {/* 2. DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        </div>

        {/* 3. ICONS & BUTTONS */}
        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative text-slate-700 hover:text-blue-600 transition">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          
          <Link to="/login" className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
            <User size={18} />
            <span>Login</span>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
           <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Home</Link>
           <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-slate-700">Products</Link>
           <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-blue-600">Login / Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;