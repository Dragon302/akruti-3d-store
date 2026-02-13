import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold mb-4">Akruti.</h2>
          <p className="text-slate-400 mb-6">
            Innovating the future of 3D printing with secure, durable, and eco-friendly designs.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><Facebook size={18}/></div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><Instagram size={18}/></div>
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"><Twitter size={18}/></div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-lg mb-6">Shop</h3>
          <ul className="space-y-3 text-slate-400">
            <li className="hover:text-blue-400 cursor-pointer">All Products</li>
            <li className="hover:text-blue-400 cursor-pointer">New Arrivals</li>
            <li className="hover:text-blue-400 cursor-pointer">Best Sellers</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-3 text-slate-400">
            <li className="hover:text-blue-400 cursor-pointer">Track Order</li>
            <li className="hover:text-blue-400 cursor-pointer">Shipping Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">Returns</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-6">Stay Updated</h3>
          <div className="flex gap-2">
            <input type="email" placeholder="Enter your email" className="bg-slate-800 border-none rounded-lg px-4 py-3 w-full text-white focus:ring-2 focus:ring-blue-600 outline-none" />
            <button className="bg-blue-600 px-4 py-3 rounded-lg font-bold hover:bg-blue-700">Go</button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
        &copy; 2026 Akruti 3D Store. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;