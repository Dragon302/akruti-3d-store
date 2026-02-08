import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a163a] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Akruti<span className="text-secondary">.3D</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            India's premium destination for high-quality 3D printed artifacts, cosplay props, and custom prototypes. Turning imagination into reality.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-pink-600 transition"><Instagram size={18}/></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-500 transition"><Twitter size={18}/></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-700 transition"><Linkedin size={18}/></a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition"><Facebook size={18}/></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-cyan-400">Get to Know Us</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition">About Akruti</Link></li>
            <li><Link to="/shop" className="hover:text-white transition">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Press Releases</Link></li>
            <li><Link to="/" className="hover:text-white transition">Akruti Science</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-cyan-400">Let Us Help You</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white transition">Your Account</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">Your Orders</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Shipping Rates</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Returns & Replacements</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Help Centre</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-6 text-cyan-400">Contact Us</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="text-pink-500 mt-1" size={18} />
              <span>123 Maker Street, Bhiwandi,<br/>Maharashtra, India - 421302</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-pink-500" size={18} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-pink-500" size={18} />
              <span>support@akruti.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-8 mt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Akruti 3D Solutions. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link to="/" className="hover:text-white">Privacy Policy</Link>
          <Link to="/" className="hover:text-white">Terms of Service</Link>
          <Link to="/" className="hover:text-white">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;