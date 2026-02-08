import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch products from backend
    axios.get('https://akruti-3d-store.onrender.com/api/products')
      .then(res => {
        setProducts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load products");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f0c29] flex items-center justify-center text-white">Loading Shop...</div>;

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
        Explore Our Collection
      </h1>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-[#1a163a] rounded-2xl border border-white/10 overflow-hidden hover:border-pink-500/50 transition-all group relative">
            
            {/* Image Area */}
            <div className="h-64 bg-white p-4 flex items-center justify-center relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Overlay Actions (Only show on hover) */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/product/${product._id}`} className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition">
                  <Eye size={20} />
                </Link>
                <button onClick={() => addToCart(product)} className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>

            {/* Info Area */}
            <div className="p-5">
              <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-3">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-cyan-400">₹{product.price}</span>
                <div className="text-yellow-500 text-xs flex items-center gap-1">
                  ⭐ {product.rating ? product.rating.toFixed(1) : "New"}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          <p>No products found. Admin needs to add some!</p>
        </div>
      )}

    </div>
  );
};

export default ShopPage;