import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  
  // --- SEARCH & FILTER STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Load Products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // Filter Logic (Runs whenever search or category changes)
  useEffect(() => {
    let result = products;

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Filter by Search Term
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  // Unique Categories
  const categories = ['All', ...new Set(products.map(p => p.category || '3D Print'))];

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 md:p-12">
      
      {/* --- HEADER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Explore <span className="text-transparent lip-text bg-gradient-to-r from-pink-500 to-cyan-500">Collection</span>
        </h2>

        {/* --- CONTROLS BAR --- */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between bg-[#1a163a] p-4 rounded-2xl border border-gray-200 shadow-lg">
          
          {/* Search Input */}
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search artifacts..." 
              className="w-full bg-[#0f0c29] text-white pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-500 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' 
                    : 'bg-[#0f0c29] text-gray-400 hover:text-white border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </motion.div>

      {/* --- PRODUCT GRID --- */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <AnimatePresence>
          {filteredProducts.map((p) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={p._id}
              className="group relative bg-[#1a163a] rounded-2xl overflow-hidden border border-white/5 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(255,0,128,0.3)] transition-all duration-300"
            >
              {/* Image Area */}
              <Link to={`/product/${p._id}`}>
                <div className="h-64 overflow-hidden relative cursor-pointer">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a163a] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 bg-black/50 backdrop-blur px-3 py-1 text-xs font-bold rounded-full text-white border border-gray-200">
                    {p.category || '3D Print'}
                  </span>
                </div>
              </Link>

              {/* Details */}
              <div className="p-5 relative z-10">
                <Link to={`/product/${p._id}`}>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-500 transition-colors truncate w-full">{p.name}</h3>
                </Link>
                
                <div className="flex items-center gap-1 text-yellow-400 text-xs mb-4 mt-2">
                  <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" /> <Star size={12} fill="currentColor" />
                  <span className="text-gray-400 ml-1">(5.0)</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-cyan-400">₹{p.price}</span>
                  <button onClick={() => addToCart(p)} className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-xl shadow-lg active:scale-95 transition-all">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results Found State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Filter size={48} className="mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold">No artifacts found</h3>
          <p>Try adjusting your search or category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;