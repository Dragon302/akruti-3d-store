import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag,, User, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Detect Scroll for "Glass" effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-white border-b border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">A</div>
          <span>Akruti<span className="text-blue-600">.</span></span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-blue-600 transition-colors">Shop</Link>
          <Link to="/orders" className="hover:text-blue-600 transition-colors">Track Order</Link>
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-slate-400 hover:text-blue-600 cursor-pointer" />
          
          <Link to="/cart" className="relative text-slate-700 hover:text-blue-600">
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <Link to="/login" className="hidden md:block bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">
            Sign In
          </Link>

          {/* MOBILE MENU BTN */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden absolute top-20 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
          <Link to="/" className="font-medium text-lg">Home</Link>
          <Link to="/shop" className="font-medium text-lg">Shop</Link>
          <Link to="/login" className="font-medium text-lg text-blue-600">Sign In</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;