import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Package } from 'lucide-react'; // Added Package icon for Orders
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-secondary font-bold" : "text-gray-400 hover:text-gray-800";

  return (
    <motion.nav 
      initial={{ y: -20 }} animate={{ y: 0 }}
      className="sticky w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-gray-800">
          Akruti<span className="text-secondary">.3D</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link to="/" className={isActive('/')}>Home</Link>
          
          <Link to="/shop" className={isActive('/shop')}>Catalog</Link>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          {user?.isAdmin && <Link to="/admin" className="text-pink-500 font-bold">Admin Panel</Link>}
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          
          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-gray-800 hover:bg-white/10 rounded-full transition">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Logic */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-cyan-400 hidden sm:block">Hi, {user.name}</span>
              
              {/* --- CORRECTED SECTION START --- */}
              {/* My Orders Link (Separate from Logout) */}
              <Link to="/orders" className="text-sm text-gray-300 hover:text-gray-800 transition flex items-center gap-1">
                <Package size={16} /> <span className="hidden sm:inline">Orders</span>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={logout} 
                className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 text-gray-800 px-3 py-2 rounded-lg text-xs font-bold transition border border-white/5"
              >
                <LogOut size={16} /> Logout
              </button>
              {/* --- CORRECTED SECTION END --- */}

            </div>
          ) : (
            <Link to="/login" className="p-2 text-gray-800 hover:bg-white/10 rounded-full transition">
              <User size={22} />
            </Link>
          )}

        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;